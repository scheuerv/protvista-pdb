import ProtvistaVariation from "protvista-variation";
import {listenForTooltips} from "./tooltip";


class ProtvistaPdbVariation extends ProtvistaVariation {
    _createTrack() {
      super._createTrack();
      this.svg.style("width", "100%");
    }

    _createFeatures() {
        super._createFeatures();
        listenForTooltips(this);
    }
    refresh(){
      super.refresh();
      super.svg.selectAll("circle.feature")
      .attr("tooltip-trigger", "true");;
    }

}

export default ProtvistaPdbVariation;