WallsLayer.prototype.deactivate = function() {
  PlaceablesLayer.prototype.deactivate.call(this);
  const isToggled = game.settings.get("wall-toggle", "wallToggle");
  if (this.objects) {
    this.objects.visible = isToggled;
  }
  this.interactiveChildren = false;

  // Re-initialize perception layers
  this.initialize();
  canvas.sight.initialize().then(() => {
    canvas.sounds.initialize();
  });
  return this;
};

Hooks.on("getSceneControlButtons", controls => {
  for (let control of controls) {
    if (control.name == 'walls') {
      control.tools.splice(1, 0, {
        name: "toggle",
        title: "Toggle Walls Display",
        icon: "fas fa-map-pin",
        toggle: true,
        active: game.settings.get("wall-toggle", "wallToggle"),
        onClick: toggled => game.settings.set("wall-toggle", "wallToggle", toggled)
      });
    }
  }
});

Hooks.on('init', () => {
    game.settings.register('wall-toggle', 'wallToggle', {
      name: 'Always display walls?',
      hint: 'If checked, the walls will always be shown.',
      type: Boolean,
      default: false,
      scope: 'client',
      config: false
    });
});

