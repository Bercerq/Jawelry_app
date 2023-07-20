import { LegacyCard, Select } from "@shopify/polaris";
import React from "react";

function VariantPicker({ selectedProduct,selectedVariant, setSelectedVariant }) {
  return (
    <LegacyCard title="Choose variant" sectioned>
      <Select
        label="Select the variant you want to configure."
        options={selectedProduct?.variants?.nodes.map((variant) => ({
          label: variant.title,
          value: variant.title,
        }))}
        onChange={(value) => setSelectedVariant(value)}
        value={selectedVariant}
      />
    </LegacyCard>
  );
}

export default VariantPicker;
