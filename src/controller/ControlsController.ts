import { event } from "../core/Events";

export class ControlsController {
  private spawnRateValue: HTMLElement;
  private gravityValue: HTMLElement;
  private countField: HTMLElement;
  private areaField: HTMLElement;

  constructor() {
    this.spawnRateValue = document.getElementById("spawnRateValue")!;
    this.gravityValue = document.getElementById("gravityValue")!;
    this.countField = document.getElementById("quant")!;
    this.areaField = document.getElementById("area")!;

    this.initControls();
  }

  private initControls() {
    document.getElementById("spawnRateMinus")?.addEventListener("click", () => {
      const value = Math.max(0, parseInt(this.spawnRateValue.innerText) - 1);
      this.spawnRateValue.innerText = value.toString();
      event.emit("spawnRateChanged", { value });
    });

    document.getElementById("spawnRatePlus")?.addEventListener("click", () => {
      const value = parseInt(this.spawnRateValue.innerText) + 1;
      this.spawnRateValue.innerText = value.toString();
      event.emit("spawnRateChanged", { value });
    });

    document.getElementById("gravityMinus")?.addEventListener("click", () => {
      const value = Math.max(0, parseInt(this.gravityValue.innerText) - 1);
      this.gravityValue.innerText = value.toString();
      event.emit("gravityChanged", { value });
    });

    document.getElementById("gravityPlus")?.addEventListener("click", () => {
      const value = parseInt(this.gravityValue.innerText) + 1;
      this.gravityValue.innerText = value.toString();
      event.emit("gravityChanged", { value });
    });
  }

  public update(count: number, area: number) {
    this.countField.innerText = count.toString();
    this.areaField.innerText = area.toFixed(0) + " px²";
  }
}
