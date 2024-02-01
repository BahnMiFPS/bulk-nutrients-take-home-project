import { BoltIcon } from '@heroicons/react/24/outline';
import { SearchSelect, SearchSelectItem } from '@tremor/react';

export interface ISearchSelectComponentProps {
  selectedProduct: string | undefined;
  setSelectedProduct: React.Dispatch<React.SetStateAction<string | undefined>>;
  allProducts: { value: string; label: string }[];
}

export const FlavourSearchSelect: React.FC<ISearchSelectComponentProps> = ({
  selectedProduct,
  setSelectedProduct,
  allProducts
}) => {
  return (
    <SearchSelect
      value={selectedProduct}
      title="Filter"
      placeholder="Filter flavour by product..."
      onValueChange={setSelectedProduct}
      defaultValue="all"
      className="max-w-xs mb-2"
    >
      {allProducts.map((option) => (
        <SearchSelectItem
          key={option.value}
          value={option.value}
          icon={BoltIcon}
        >
          {option.label}
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
};
