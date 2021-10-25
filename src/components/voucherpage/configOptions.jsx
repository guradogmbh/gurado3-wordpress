import { observer } from 'mobx-react-lite';

const ConfigOptions = observer(({ configStore, voucherStore }) => {
  console.log(voucherStore.isConfigurable);
  console.log(voucherStore.options[0].type);
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 'calc(33.333333% + 400px)',
      }}
    >
      {voucherStore.options.map((option, o) => {
        if (option.type.toLowerCase() === 'dropdown') {
          return (
            <select
              key={`optd${o}`}
              style={{ marginBottom: '20px' }}
              defaultValue="1"
              onInput={(e) =>
                voucherStore.setOption(
                  option.option_id,
                  e.target.value,
                )
              }
            >
              <option value="1" disabled>
                {option.title}{' '}
                {option.is_required === 'YES' ? '(erforderlich)' : ''}
              </option>
              {option.values.map((value, v) => {
                return (
                  <option value={value.value_id} key={`optd${o}${v}`}>
                    {value.title}
                  </option>
                );
              })}
            </select>
          );
        }
      })}
    </div>
  );
});
export default ConfigOptions;
