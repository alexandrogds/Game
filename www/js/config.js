let isLandscape = true;

// Wait for deviceready before initializing
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    initOrientationControl();
    screen.orientation.lock('landscape');
}

function initOrientationControl() {
    const orientationIndicator = document.querySelector('.orientation-indicator');
    if (orientationIndicator) {
        orientationIndicator.addEventListener('click', toggleOrientation);
    }
}

function toggleOrientation() {
    try {
        isLandscape = !isLandscape;
        const orientation = isLandscape ? 'landscape' : 'portrait';
        screen.orientation.lock(orientation);
    } catch (error) {
        console.error('Erro ao mudar orientação:', error);
    }
}
