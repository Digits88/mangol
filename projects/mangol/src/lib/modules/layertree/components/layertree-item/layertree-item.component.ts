import { Component, Input, OnInit } from '@angular/core';

import { LayertreeItemNode } from '../../classes/layertree-item-node.class';
import { layertreeVisibilityIconStateTrigger } from '../../layertree.animations';

@Component({
  selector: 'mangol-layertree-item',
  templateUrl: './layertree-item.component.html',
  styleUrls: ['./layertree-item.component.scss'],
  animations: [layertreeVisibilityIconStateTrigger]
})
export class LayertreeItemComponent implements OnInit {
  @Input() items: LayertreeItemNode[];
  @Input() level: number;

  dictLayers = 'Layers';

  groups: LayertreeItemNode[] = [];
  layers: LayertreeItemNode[] = [];

  constructor() {}

  ngOnInit() {
    this.items.forEach(i => {
      if (i.hasOwnProperty('children')) {
        this.groups.push(i);
      } else if (i.hasOwnProperty('layer')) {
        this.layers.push(i);
      }
    });
  }

  getStyle() {
    return {
      'margin-left': (this.level === 0 ? 0 : 30) + 'px'
    };
  }

  toggleLayerVisibility(item: LayertreeItemNode) {
    item.layer.layer.setVisible(!item.layer.layer.getVisible());
    item.checked = !item.checked;
  }
}