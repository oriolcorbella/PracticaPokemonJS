export function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
}

export class Timer {
    constructor(element) {
        this.element = element;
        this.seconds = 0;
        this.intervalId = null;
    }

    start() {
        this.stop();
        this.seconds = 0;
        this.render();

        this.intervalId = setInterval(() => {
            this.seconds++;
            this.render();
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    render() {
        this.element.textContent = formatTime(this.seconds);
    }
}
