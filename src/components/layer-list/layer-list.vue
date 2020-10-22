<template>
  <v-treeview
    :items="layersWithParents"
    @input="handleChange"
    selectable
    open-all
  >
    <template v-slot:label="{ item, selected }">
      <div class="d-flex align-center">
        <span
          class="sortable-handle"
          :data-id="item.id"
          :data-parent-id="item.parentId"
          >{{ item.name }}</span
        >
        <v-btn
          v-if="item.layer && selected"
          icon
          class="ml-auto"
          @click="handleLegendClick(item.id)"
        >
          <v-icon
            >mdi-card-bulleted{{
              item.id === activeLegend ? "" : "-off"
            }}-outline</v-icon
          >
        </v-btn>
      </div>
    </template>
  </v-treeview>
</template>

<script>
import findInTree from "./find-in-tree";
import { Sortable } from "sortablejs";
const idSelector = "data-id";
const parentIdSelector = "data-parent-id";

export default {
  props: {
    layers: {
      type: Array,
      required: true,
    },
    activeLegend: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    input: null,
    selected: null,
  }),
  computed: {
    layersWithParents() {
      return this.layers.map((layer) => {
        if (layer.children) {
          return {
            ...layer,
            children: layer.children.map((child) => {
              return {
                ...child,
                parentId: layer.id,
              };
            }),
          };
        }

        return layer;
      });
    },
    sortableConfig() {
      return {
        animation: 150,
        onUpdate: (event) => {
          const { oldDraggableIndex, newDraggableIndex, item: $item } = event;
          const $handle = $item.querySelector(".sortable-handle");
          const id = $handle.getAttribute(idSelector);
          const parentId = $handle.getAttribute(parentIdSelector);
          this.$emit("reorder", {
            oldDraggableIndex,
            newDraggableIndex,
            id,
            parentId,
          });
        },
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initSortable();
    });
  },
  methods: {
    initSortable() {
      const $rootEl = document.querySelector(".v-treeview");
      const $childEls = document.querySelectorAll(".v-treeview-node__children");
      const $sortableEls = [$rootEl, ...$childEls];
      $sortableEls.forEach(this.makeSortable);
    },
    makeSortable(el) {
      Sortable.create(el, this.sortableConfig);
    },
    handleChange(ids) {
      const layers = ids.map((id) => findInTree(this.layers, "id", id));
      this.$emit("change", layers);
    },
    handleLegendClick(id) {
      this.$emit("legendChange", id);
    },
  },
};
</script>

<style>
.sortable-handle {
  cursor: move;
}
</style>
