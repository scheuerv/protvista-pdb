import NonOverlappingLayout from "protvista-track/src/NonOverlappingLayout";

class ProtvistaPdbNonOverlappingLayout extends NonOverlappingLayout {
    getFeatureHeight() {
        return Math.max(1,this._rowHeight - 2 * this._padding);
      }
}

export default ProtvistaPdbNonOverlappingLayout;