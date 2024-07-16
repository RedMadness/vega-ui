<template>
  <div id="floatingCirclesG">
    <div id="frotateG_01" class="f_circleG"></div>
    <div id="frotateG_02" class="f_circleG"></div>
    <div id="frotateG_03" class="f_circleG"></div>
    <div id="frotateG_04" class="f_circleG"></div>
    <div id="frotateG_05" class="f_circleG"></div>
    <div id="frotateG_06" class="f_circleG"></div>
    <div id="frotateG_07" class="f_circleG"></div>
    <div id="frotateG_08" class="f_circleG"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '#40A0FFFF',
  },
  scale: {
    type: Number,
    default: 1,
  },
})
</script>

<style scoped>
#floatingCirclesG {
  position: relative;
  width: 29px;
  height: 29px;
  margin: auto;
  transform: scale(0.6);
  -o-transform: scale(0.6);
  -ms-transform: scale(0.6);
  -webkit-transform: scale(0.6);
  -moz-transform: scale(0.6);
}

.f_circleG {
  position: absolute;
  background-color: v-bind(color);
  height: 5px;
  width: 5px;
  border-radius: 3px;
  -o-border-radius: 3px;
  -ms-border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  animation-name: f_fadeG;
  -o-animation-name: f_fadeG;
  -ms-animation-name: f_fadeG;
  -webkit-animation-name: f_fadeG;
  -moz-animation-name: f_fadeG;
  animation-duration: 0.782s;
  -o-animation-duration: 0.782s;
  -ms-animation-duration: 0.782s;
  -webkit-animation-duration: 0.782s;
  -moz-animation-duration: 0.782s;
  animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-direction: normal;
  -o-animation-direction: normal;
  -ms-animation-direction: normal;
  -webkit-animation-direction: normal;
  -moz-animation-direction: normal;
}

#frotateG_01 {
  left: 0;
  top: 12px;
  animation-delay: 0.2895s;
  -o-animation-delay: 0.2895s;
  -ms-animation-delay: 0.2895s;
  -webkit-animation-delay: 0.2895s;
  -moz-animation-delay: 0.2895s;
}

#frotateG_02 {
  left: 3px;
  top: 3px;
  animation-delay: 0.386s;
  -o-animation-delay: 0.386s;
  -ms-animation-delay: 0.386s;
  -webkit-animation-delay: 0.386s;
  -moz-animation-delay: 0.386s;
}

#frotateG_03 {
  left: 12px;
  top: 0;
  animation-delay: 0.4825s;
  -o-animation-delay: 0.4825s;
  -ms-animation-delay: 0.4825s;
  -webkit-animation-delay: 0.4825s;
  -moz-animation-delay: 0.4825s;
}

#frotateG_04 {
  right: 3px;
  top: 3px;
  animation-delay: 0.589s;
  -o-animation-delay: 0.589s;
  -ms-animation-delay: 0.589s;
  -webkit-animation-delay: 0.589s;
  -moz-animation-delay: 0.589s;
}

#frotateG_05 {
  right: 0;
  top: 12px;
  animation-delay: 0.6855s;
  -o-animation-delay: 0.6855s;
  -ms-animation-delay: 0.6855s;
  -webkit-animation-delay: 0.6855s;
  -moz-animation-delay: 0.6855s;
}

#frotateG_06 {
  right: 3px;
  bottom: 3px;
  animation-delay: 0.782s;
  -o-animation-delay: 0.782s;
  -ms-animation-delay: 0.782s;
  -webkit-animation-delay: 0.782s;
  -moz-animation-delay: 0.782s;
}

#frotateG_07 {
  left: 12px;
  bottom: 0;
  animation-delay: 0.8785s;
  -o-animation-delay: 0.8785s;
  -ms-animation-delay: 0.8785s;
  -webkit-animation-delay: 0.8785s;
  -moz-animation-delay: 0.8785s;
}

#frotateG_08 {
  left: 3px;
  bottom: 3px;
  animation-delay: 0.975s;
  -o-animation-delay: 0.975s;
  -ms-animation-delay: 0.975s;
  -webkit-animation-delay: 0.975s;
  -moz-animation-delay: 0.975s;
}

@keyframes f_fadeG {
  0% {
    background-color: v-bind(color);
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-o-keyframes f_fadeG {
  0% {
    background-color: v-bind(color);
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-ms-keyframes f_fadeG {
  0% {
    background-color: v-bind(color);
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-webkit-keyframes f_fadeG {
  0% {
    background-color: v-bind(color);
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-moz-keyframes f_fadeG {
  0% {
    background-color: v-bind(color);
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}
</style>
