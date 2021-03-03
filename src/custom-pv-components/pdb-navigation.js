import ProtvistaNavigation from "protvista-navigation";


class ProtvistaPdbNavigation extends ProtvistaNavigation {
  
  _createNavRuler() {
    super._createNavRuler();
    this._svg.style("width", "100%");
    
  }
}

export default ProtvistaPdbNavigation;
