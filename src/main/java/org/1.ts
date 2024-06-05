duration(): number {
    let ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        // eslint-disable-next-line zk/noMixedHtml
        crypto.randomBytes(3);
        const rand = (crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296), // 4294967296 == 2^32
            deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) === 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
}
const r = Math.random(3);