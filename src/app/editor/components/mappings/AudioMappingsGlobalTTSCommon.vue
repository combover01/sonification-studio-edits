<template>
    <div class="audio-global-contexts-container">
        <div
            v-for="context in contexts"
            :key="context.id"
            class="context-card"
        >
            <div class="context-header">
                <h6>
                    Common value {{ context.id }}
                </h6>
                <button
                    class="remove-btn"
                    aria-label="Remove context"
                    @click="onRemoveContext(context.id)"
                >
                    <img
                        alt=""
                        :src="removeIcon"
                    >
                </button>
            </div>

            <div class="context-conditions">
                Speak <SEControl
                    helpfor="Speak"
                    helptext="Speaks the common value"
                    :horizontal="true"
                    :compact-content="true"
                >
                    <select
                        id="speak-select"
                        v-model="context.speakTypes"
                        aria-label="Speak"
                    >
                        <option
                            v-for="speakType in speakTypes"
                            :key="speakType"
                            :value="speakType"
                        >
                            {{ speakType }}
                        </option>
                    </select>
                </SEControl>
                value for
                <SEControl
                    helpfor="Axis"
                    helptext="Axis type"
                    :horizontal="true"
                    :compact-content="true"
                >
                    <select
                        id="axisType-select"
                        v-model="context.axisTypes"
                        aria-label="Axis"
                    >
                        <option
                            v-for="axisType in axisTypes"
                            :key="axisType"
                            :value="axisType"
                        >
                            {{ axisType }}
                        </option>
                    </select>
                </SEControl> axis
                <SEControl
                    helpfor="Speak When"
                    helptext="When to speak the common value"
                    :horizontal="true"
                    :compact-content="true"
                >
                    <select
                        id="speakWhen-select"
                        v-model="context.speakWhen"
                        aria-label="When"
                    >
                        <option
                            v-for="when in speakWhen"
                            :key="when"
                            :value="when"
                        >
                            {{ when }}
                        </option>
                    </select>
                </SEControl> the chart plays
            </div>

            <button
                :aria-expanded="context.showDetails"
                class="details-btn"
                @click="context.showDetails = !context.showDetails"
            >
                <img
                    alt=""
                    :src="arrowDownIcon"
                >Details
            </button>

            <div
                v-show="context.showDetails"
                class="details"
            >
                <SEControl
                    v-slot="slotProps"
                    label="Volume"
                    helptext="The volume for the context."
                    :horizontal-reverse="true"
                    :expand-content="true"
                >
                    <SESlider
                        :id="slotProps.controlId"
                        v-model.number="context.volume"
                        :labelledby="slotProps.labelId"
                    />
                </SEControl>
                <fieldset>
                    <legend>Voice</legend>
                    <SEControl
                        label="Type"
                        helptext="The type of voice that text to speech feature speaks."
                        :horizontal-reverse="true"
                        :expand-content="true"
                    >
                        <SEControl
                            :horizontal="true"
                            :compact-content="true"
                        >
                            <select
                                id="voice-select"
                                v-model="context.voiceTypes"
                                aria-label="Voice"
                            >
                                <option
                                    v-for="voiceType in voiceTypes"
                                    :key="voiceType"
                                    :value="voiceType"
                                >
                                    {{ voiceType }}
                                </option>
                            </select>
                        </SEControl>
                    </SEControl>
                    <SEControl
                        v-slot="slotProps"
                        label="Speed (%)"
                        helptext="The speed of the text to speech voice."
                        :horizontal-reverse="true"
                        :expand-content="true"
                    >
                        <SESlider
                            :id="slotProps.controlId"
                            v-model.number="context.speed"
                            :labelledby="slotProps.labelId"
                            :max="200"
                            :min="50"
                            :step="5"
                        />
                    </SEControl>
                </fieldset>
            </div>
        </div>

        <SEButton
            class="add-btn"
            @click="addContext"
        >
            <img
                alt=""
                :src="addIcon"
            > Add
        </SEButton>
    </div>
</template>

<script lang="ts">
import SEButton from '../basic/SEButton.vue';
import SEControl from '../basic/SEControl.vue';
import SESlider from '../basic/SESlider.vue';
import SEDropdown from '../basic/SEDropdown.vue';
import SERadioGroup from '../basic/SERadioGroup.vue';
import addIcon from '../../assets/plus-solid.svg';
import removeIcon from '../../assets/xmark-solid.svg';
import arrowDownIcon from '../../assets/arrow-down.svg';
import { mapState } from 'vuex';

// Get step value for a slider to fit range
function getSliderStep(range: number, steps: number): number {
    const step = Math.abs(range) / steps;
    if (step >= 1) {
        const pow = ('' + Math.round(step)).length - 1;
        return Math.pow(10, pow);
    } else {
        const pow = ('' + step).search(/[1-9]/) - 1;
        if (pow < 0) {
            return step;
        }
        return 1 / Math.pow(10, pow);
    }
}


export default {
    components: {
        SEButton,
        SEControl,
        SESlider
    },
    props: {
        variableValueProp: { type: Boolean, required: true }
    },
    data() {
        return {
            addIcon,
            arrowDownIcon,
            removeIcon,
            valueProps: ['x', 'y'],
            speakTypes: ['mean', 'median', 'mode', 'max', 'min'],
            axisTypes: ['X', 'Y'],
            speakWhen: ['before', 'during', 'after'],
            voiceTypes: ['Male voice 1', 'Male voice 2', 'Female voice 1', 'Female voice 2'],
            pitchTypeOptions: [{
                value: 'fixed', label: 'Fixed'
            }, {
                value: 'mappped', label: 'Mapped'
            }]
        };
    },
    computed: {
        instruments() {
            return (this as any).$chartBridge.getAvailableInstruments();
        },
        xRange() {
            return this.getPropRange('x');
        },
        yRange() {
            return this.getPropRange('y');
        },
        xStep() {
            return getSliderStep(this.xRange.max - this.xRange.min, 200);
        },
        yStep() {
            return getSliderStep(this.yRange.max - this.yRange.min, 200);
        },
        ...mapState({
            reactToDataUpdates: (state: any) => state.viewStore.reactToDataUpdates,
            contexts: (state: any) => state.globalSonifyParametersStore.contexts,
            selectedHeaderTabContent: (state: any) => state.viewStore.selectedHeaderTabContent,
            xAxisIsDate: (state: any) => state.chartParametersStore.xAxisType === 'datetime'
        })
    },
    watch: {
        contexts: {
            handler() {
                // Force update since deep changes also need to trigger.
                this.$chartBridge.forceUpdate(true);
            },
            deep: true
        }
    },
    mounted() {
        if (!this.contexts.length) {
            this.addContext(true);
        }
    },
    methods: {
        onRemoveContext(id: number) {
            this.$store.commit('globalSonifyParametersStore/removeContext', id);
        },
        addContext(inactive = false) {
            const range = this.xRange.max - this.xRange.min;
            this.$store.commit('globalSonifyParametersStore/addContext', {
                valueRange: this.xAxisIsDate ? range : null,
                inactive
            });
        },
        getPropRange(prop: string) {
            const range = (this as any).$chartBridge.reactiveGet(
                'getMinMaxValuesForProp', this.reactToDataUpdates, prop);
            if (range.max - range.min > 1) {
                return {
                    max: Math.ceil(range.max),
                    min: Math.ceil(range.min)
                };
            }
            return range;
        },
        onInstrumentChange(context) {
            if (context.instrument && this.selectedHeaderTabContent !== 'dataContent') {
                (this as any).$chartBridge.playAudioSample(context.instrument);
            }
        },
    }
};
</script>

<style lang="less" scoped>
@import "../../colors";

.context-card {
    border: 1px solid @dark-blue-10;
    border-left: none;
    border-right: none;
    padding: 10px;
    background-color: @light-purple-8;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
}

.context-card:not(:first-child) {
    margin-top: 20px;
}

.remove-btn {
    width: 30px;
    background: none;
    border: none;
    cursor: pointer;
    img {
        width: 19px;
        height: $width;
    }
}

.add-btn {
    margin-top: 15px;
    height: 1.6rem;
    line-height: 1.2rem;
    padding: 2px 10px;
    img {
        margin-bottom: -2px;
        width: 0.8rem;
        height: $width;
    }
    &:hover {
        img {
            filter: invert();
        }
    }
}

.context-header {
    display: flex;
    justify-content: space-between;
    h6 {
        font-size: 0.9rem;
    }
    margin-bottom: 10px;
}

.se-control {
    margin-top: 5px;
}

.context-conditions {
    input {
        width: 3rem;
    }
    select {
        width: 8rem;
        margin: 10px 5px 8px 0;
        line-height: 1rem;
    }
}

fieldset {
    border: 1px solid @purple-5;
    padding: 5px;
    margin: 15px 0;
    .se-control {
        margin-top: 0;
    }
    legend {
        padding: 0 5px;
    }
}

.details-btn {
    margin-top: 10px;
    margin-bottom: 5px;
    width: 4.5rem;
    background: none;
    border: none;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
    img {
        width: 20px;
        height: $width;
    }
}

.details-btn:not([aria-expanded="true"]) img {
    transform: rotate(-90deg) translate(-5px, -4px);
}

.details {
    margin-top: 10px;
    border-top: 1px solid @purple-5;
    padding-top: 15px;
}
</style>
