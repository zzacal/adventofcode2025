type LapEventHandler = (lapped: number) => void;

export class Counter {
  constructor(public readonly limit: number, public position: number, private lapHandler?: LapEventHandler) {
  }

  count(to: string): number {
    const direction = to.charAt(0) === "L" ? -1 : 1;

    // TODO: handle Nans
    const amount = Number(to.slice(1));

    const ineffectiveLaps = Math.floor(amount / this.limit);

    this.lapHandler && this.lapHandler(ineffectiveLaps);

    const effectiveCount = direction * amount % this.limit;

    const isAtOrigin = this.position === 0;

    this.position = this.position + effectiveCount;

    if(this.position > this.limit) {
      this.lapHandler && this.lapHandler(1);
      this.position = this.position % this.limit;
    }
    else if(this.position === this.limit) {
      this.lapHandler && this.lapHandler(1);
      this.position = 0;
    } 
    else if (this.position < 0) {
      !isAtOrigin && this.lapHandler && this.lapHandler(1);
      this.position = this.limit + this.position;
    }
    else if(this.position === 0) {
      this.lapHandler && this.lapHandler(1);
    }

    return this.position;
  }
}
