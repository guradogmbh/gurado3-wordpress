export default function PriceConfigurationLabel({ p, v }) {
  switch (p.type.toLowerCase()) {
    case 'configurable':
      return (
        'ab ' +
        parseFloat(p.minimum).toFixed(2).replace('.', ',') +
        ' ' +
        v.getCurrencyCode()
      );
    case 'range':
      return p.from + ' - ' + p.to + ' ' + v.getCurrencyCode();
    case 'fixed':
      if (p.amount === '0') return 'konfigurierbar';
      return (
        parseFloat(p.amount).toFixed(2).replace('.', ',') +
        ' ' +
        v.getCurrencyCode()
      );
    case 'dropdown':
      return (
        parseFloat(p.options[0]).toFixed(2).replace('.', ',') +
        ' ' +
        v.getCurrencyCode() +
        ' - ' +
        parseFloat(p.options[p.options.length - 1])
          .toFixed(2)
          .replace('.', ',') +
        ' ' +
        v.getCurrencyCode()
      );
  }
  return p + ' ' + v.getCurrencyCode();
}
