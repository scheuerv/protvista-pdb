import ProtvistaTrack from "protvista-track";
import {listenForTooltips} from "./tooltip";
import ProtvistaPdbNonOverlappingLayout from "./pdb-NonOverlappingLayout";
import DefaultLayout from "protvista-track/src/DefaultLayout";

const margin = {
  top: 10,
  bottom: 10
};

class ProtvistaPdbTrack extends ProtvistaTrack {

  _createTrack() {
    super._createTrack();
    this.svg.style("width", "100%");
  }

  _createFeatures() {
    super._createFeatures();     
    this.locations
      .selectAll("g.fragment-group")
      .select("rect")
      .attr("tooltip-trigger", "true");
    listenForTooltips(this);
  }

  getLayout() {
    if (String(this.getAttribute("layout")).toLowerCase() === "non-overlapping")
      return new ProtvistaPdbNonOverlappingLayout({
        layoutHeight: this._height,
      });
    return new DefaultLayout({
      layoutHeight: this._height,
    });
  }
}
export default ProtvistaPdbTrack;