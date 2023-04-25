<template>
  <q-page class="q-pt-sm">
    <q-toolbar class="title-header text-h5 text-center">
      <strong>{{ title }}</strong>
    </q-toolbar>

    <div class="row q-mt-md">
      <div class="col-12">
        <div id="panoEl" class="marzipano-iframe"></div>
      </div>
      <div id="spot1" @click="goToScene('scene2')"><img src="~/assets/icons/up.png" alt=""></div>
      <div id="spot2" @click="goToScene('scene1')"><img src="~/assets/icons/up.png" alt=""></div>
      <div id="spot3" @click="goToScene('scene3')"><img src="~/assets/icons/up.png" alt=""></div>
      <div id="spot4" @click="goToScene('scene2')"><img src="~/assets/icons/up.png" alt=""></div>
    </div>

    <div class="fixed-left side-menu">
      <q-list bordered separator class="text-h6">
        <q-item clickable @click="goToScene('scene1')">
          <q-item-section>Entrada</q-item-section>
        </q-item>
        <q-item clickable @click="goToScene('scene2')">
          <q-item-section>Centro</q-item-section>
        </q-item>
        <q-item clickable @click="goToScene('scene3')">
          <q-item-section>Salida</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// @ts-ignore
import Marzipano from 'marzipano'

const title = ref('Entrada')

var scene1: any, scene2: any, scene3: any;

onMounted(async () => {
  await nextTick()

  const panoEl = document.querySelector('#panoEl')

  const viewer = new Marzipano.Viewer(panoEl);
  const source = Marzipano.ImageUrlSource.fromString("/images/01.jpg");
  const source2 = Marzipano.ImageUrlSource.fromString("/images/02.jpg");
  const source3 = Marzipano.ImageUrlSource.fromString("/images/03.jpg");

  const geometry = new Marzipano.EquirectGeometry([{ width: 8000 }]);
  const limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);
  const view = new Marzipano.RectilinearView({ yaw: 0 }, limiter);
  const autorotate = Marzipano.autorotate({
    yawSpeed: 0.04,
    targetPitch: 0,
    targetFov: Math.PI / 2
  });

  // viewer.setIdleMovement(3000, autorotate);

  scene1 = viewer.createScene({ source: source, geometry: geometry, view: view });

  const spot1 = document.getElementById('spot1');
  scene1.hotspotContainer().createHotspot(spot1, { yaw: 0.72, pitch: -0.15 })

  scene2 = viewer.createScene({ source: source2, geometry: geometry, view: view });

  const spot2 = document.getElementById('spot2');
  const spot3 = document.getElementById('spot3');

  scene2.hotspotContainer().createHotspot(spot2, { yaw: -0.05, pitch: 0.05 })
  scene2.hotspotContainer().createHotspot(spot3, { yaw: .8, pitch: 0 })

  scene3 = viewer.createScene({ source: source3, geometry: geometry, view: view });

  const spot4 = document.getElementById('spot4');
  scene3.hotspotContainer().createHotspot(spot4, { yaw: 0.15, pitch: 0 })


  // Set escena inicial
  scene1.switchTo({ transitionDuration: 1000 });

})

function goToScene (sceneName: 'scene1' | 'scene2' | 'scene3') {
  if (sceneName === 'scene1') {
    scene1.switchTo({ transitionDuration: 1000 });
    title.value = 'Entrada'
  }

  if (sceneName === 'scene2') {
    scene2.switchTo({ transitionDuration: 1000 });
    title.value = 'Centro'
  }

  if (sceneName === 'scene3') {
    scene3.switchTo({ transitionDuration: 1000 });
    title.value = 'Salida'
  }
}

</script>

<style >
.marzipano-iframe {
  width: 100%;
  height: 800px;
  position: relative !important;
}

.title-header {
  background-color: rgba(71, 255, 47, 0.616);
  border-radius: 10px;
  width: 50%;
  text-align: center;
}

.side-menu {
  background-color: rgba(255, 255, 255, 0.753);
  height: 600px;
  width: 240px;
  top: 10%;
  /* z-index: 999; */
}
</style>