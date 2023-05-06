const elements: Array<string> = ["main_nav", "footer"];

export class ElementAdjustmentUtil {
  /**
   * Adjusts DOM element with given id, making changes to its height so it takes all available window height excluding height of elements listed in array named elements stored inside this util file.
   * @param id
   */
  public static adjustElement(id: string) {
    let adjusted_el = document.getElementById(id);
    if (adjusted_el == undefined) return;
    let window_height: number = window.innerHeight;
    let height_sum: number = 0;
    for (let el in elements) {
      let el_id = elements[el];
      height_sum += <number>document.getElementById(el_id)?.offsetHeight;
    }
    let remaining_height: number = window_height - height_sum;
    adjusted_el.style.height = remaining_height + "px";
  }
}
