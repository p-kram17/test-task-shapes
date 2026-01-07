type EventsMap = Record<string, unknown>;
type Callback<P> = (payload: P) => void;
type AppEvents = {
  spawnShape: { x: number; y: number; type?: string };
  deleteShape: { id: number };
  gravityChanged: { value: number };
  spawnRateChanged: { value: number };
  recolorShapes: { ids: number[] };
};

export class EventBus<Events extends EventsMap> {
  private events: { [K in keyof Events]?: Callback<Events[K]>[] } = {};

  on<K extends keyof Events>(event: K, cb: Callback<Events[K]>): void {
    (this.events[event] ||= []).push(cb);
  }

  off<K extends keyof Events>(event: K, cb: Callback<Events[K]>): void {
    this.events[event] = this.events[event]?.filter((fn) => fn !== cb);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    this.events[event]?.forEach((cb) => cb(payload));
  }
}

export const event = new EventBus<AppEvents>();
