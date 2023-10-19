<template>
    <div class="play-buttons-container">
        <PlayCheckbox
            v-model="speakX"
            :icon-path="musicIcon"
        >
            Speak X axis
        </PlayCheckbox>

        <PlayCheckbox
            v-model="speakY"
            :icon-path="musicIcon"
        >
            Speak Y axis
        </PlayCheckbox>


        <PlayCheckbox
            v-model="speakValue"
            :icon-path="musicIcon"
        >
            Speak Value
        </PlayCheckbox>

    </div>
</template>

<script lang="ts">
import { keyPressed, Keys, Modifiers } from '../core/utils/keyboardUtils';
import { mapState } from 'vuex';
import playIcon from '../assets/play.svg';
import stopIcon from '../assets/stop.svg';
import pauseIcon from '../assets/pause.svg';
import loopIcon from '../assets/loop.svg';
import musicIcon from '../assets/music-solid.svg';
//import PlayButton from './PlayButton.vue';
import PlayCheckbox from './PlayCheckbox.vue';

export default {
    components: {
        PlayCheckbox
    },
    data() {
        return {
            playing: false,
            paused: false,
            loopEnabled: false,
            speakValue:false,
            speakX:false,
            speakY:false,
            playPauseIcon: playIcon,
            stopIcon, pauseIcon, loopIcon, musicIcon
        };
    },
    computed: mapState({
        selectedHeaderTabId: (state: any) => state.viewStore.selectedHeaderTabId,
        reactToParameterUpdates: (state: any) => state.viewStore.reactToParameterUpdates,
        reactToDataUpdates: (state: any) => state.dataStore.reactToDataUpdates,
    }),
};
</script>

<style lang="less" scoped>
    .play-buttons-container {
        display: flex;
    }
</style>
