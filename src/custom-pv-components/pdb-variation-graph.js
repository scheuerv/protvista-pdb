import ProtvistaVariationGraph from "protvista-variation-graph";
import { listenForTooltips } from "./tooltip";

class ProtvistaPdbVariationGraph extends ProtvistaVariationGraph {
  _createTrack() {
    super._createTrack();
   this.svg.style("width", "100%");
  }
}

export default ProtvistaPdbVariationGraph;
