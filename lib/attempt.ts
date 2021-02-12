export default function attempt(cb: Function): any {
    try {
        return cb();
    } catch (_) {}
}
