import Marzipano from 'marzipano'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      makeMarzi: (el) => {
        var viewer = new Marzipano.Viewer(el);
        var source = Marzipano.ImageUrlSource.fromString("/images/1.jpg");
        var source2 = Marzipano.ImageUrlSource.fromString("/images/2.jpg");
        var source3 = Marzipano.ImageUrlSource.fromString("/images/3.jpg");

        var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
        var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);
        var view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);
        var autorotate = Marzipano.autorotate({
          yawSpeed: 0.04,
          targetPitch: 0,
          targetFov: Math.PI / 2
        });

        viewer.setIdleMovement(3000, autorotate);

        var scene = viewer.createScene({ source: source, geometry: geometry, view: view });
        var scene2 = viewer.createScene({ source: source2, geometry: geometry, view: view });
        var scene3 = viewer.createScene({ source: source3, geometry: geometry, view: view });

        scene.switchTo({ transitionDuration: 1000 });
      }
    }
  }
})