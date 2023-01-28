#!/bin/bash

# requirements:
# npm, uglifycss, browserify

# $ npm install -g uglifycss
# $ npm install -g uglify-js
# $ npm install -g browserify

#npm update;

uglifycss css/alert.css css/button.css css/header.css css/main.css css/root.css css/switch.css css/select.css css/slider.css > css/bundle.css

uglifyjs js/prototypes.js js/storage.js js/frequency_view.js js/audio_controller.js js/audio_controller_metronome.js js/alert.js js/information.js  js/setup_controls.js js/main.js js/keyboard_shortcuts.js js/window_resize.js js/oscilloscope.js js/install.js service_worker.js -o js/bundle.js
browserify js/bundle.js -o js/bundle.js
uglifyjs js/bundle.js -o js/bundle.js

git add *; git commit -m 'update'; git push;

echo '-- Finished build.sh for spectrogram --'