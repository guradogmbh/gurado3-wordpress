import { observer } from 'mobx-react-lite';
import ConfigurablePricetag from './priceTags/configurablePricetag';
import DropdownPricetag from './priceTags/dropdownPricetag';
import FixedPricetag from './priceTags/fixedPricetag';
import RangePricetag from './priceTags/rangePricetag';

const PriceTag = observer(({ voucherStore, configStore }) => {
  switch (
    voucherStore.voucher.price_configuration.type.toLowerCase()
  ) {
    case 'range':
      return (
        <RangePricetag
          voucherStore={voucherStore}
          configStore={configStore}
        />
      );
      break;
    case 'fixed':
      return (
        <FixedPricetag
          voucherStore={voucherStore}
          configStore={configStore}
        />
      );
    case 'configurable':
      return (
        <ConfigurablePricetag
          voucherStore={voucherStore}
          configStore={configStore}
        />
      );
    case 'dropdown':
      return (
        <DropdownPricetag
          voucherStore={voucherStore}
          configStore={configStore}
        />
      );
  }
});
export default PriceTag;
