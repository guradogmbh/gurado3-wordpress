import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';

export const PriceField = (props, setAmount) => {
  const [price, setPrice] = useState(0);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const pc = props.voucher.price_configuration;
  const options = props.voucher.options;

  const setOption = (pOptionId, pValue) => {
    if (
      props.voucherOptions.options.filter(
        (option) => option.option_id === pOptionId,
      ).length > 0
    ) {
      let index = props.voucherOptions.options.findIndex(
        (option) => option.option_id === pOptionId,
      );
      let opt = [...props.voucherOptions.options];
      opt[index].value = pValue;
      props.setVoucherOptions({ options: opt });
      return;
    }
    props.setVoucherOptions({
      options: [
        ...props.voucherOptions.options,
        { option_id: pOptionId, value: pValue },
      ],
    });
  };

  useEffect(() => {
    setEstimateLoading(true);
    props.API.getPriceEstimation(
      props.voucher.sku,
      props.voucherOptions,
    )
      .then((result) => {
        setEstimateLoading(false);
        let data = JSON.parse(result.data);
        if (data.price !== null && data.price !== undefined) {
          setPrice(parseFloat(data.price).toFixed(2));
          setAmount(parseFloat(data.price).toFixed(2));
        }
      })
      .catch((err) => {
        console.log(err);
        setEstimateLoading(false);
      });
  }, [props.voucherOptions]);

  useEffect(() => {
    setPrice(
      parseFloat(props.voucher.price_configuration.minimum).toFixed(
        2,
      ),
    );
    console.log(options);
  }, [props.voucher.options]);

  switch (pc.type.toLowerCase()) {
    case 'range':
      return (
        <>
          <Row className={props.onlyVirtual ? '' : ''}>
            <Col>
              <div className="Input my-2">
                <input
                  type="number"
                  id="input"
                  lang="de"
                  min={pc.from}
                  max={pc.to}
                  className="Input-text"
                  placeholder={
                    'Betrag (von ' +
                    pc.from +
                    ' bis ' +
                    pc.to +
                    ' ' +
                    props.voucher.currency_code +
                    ')'
                  }
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label htmlFor="input" className="Input-label">
                  Betrag
                </label>
              </div>
            </Col>
          </Row>
        </>
      );
    case 'fixed':
      return (
        <Row className="mb-2 d-flex align-items-center">
          <Col xs={4}>Betrag:</Col>
          <Col>
            <b>
              {parseFloat(pc.amount).toFixed(2).replace('.', ',')}{' '}
              {props.voucher.currency_code}{' '}
              {props.shippingMethod === 'physical'
                ? `(+${props.voucher.physical_voucher_price.total}€ Versand)`
                : ''}
            </b>
          </Col>
        </Row>
      );
    case 'configurable':
      return (
        <>
          {options.map((option) => {
            return (
              <Row key={`drpdn${option.option_id}`} className="mb-3">
                <Col>
                  {option.type.toLowerCase() === 'dropdown' && (
                    <div className="Input my-2">
                      <Form.Control
                        as="select"
                        id={`select${option.option_id}`}
                        style={{ height: '44px', color: 'black' }}
                        defaultValue="1"
                        custom
                        className="custominput Input-text"
                        onInput={(e) =>
                          setOption(option.option_id, e.target.value)
                        }
                      >
                        <option value="1" disabled>
                          {option.title}{' '}
                          {option.is_required === 'YES'
                            ? '(erforderlich)'
                            : ''}
                        </option>
                        {option.values.map((v) => {
                          return (
                            <option
                              key={v.value_id}
                              value={v.value_id}
                            >
                              {v.title}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </div>
                  )}
                  {option.type.toLowerCase() === 'static' && (
                    <div
                      key={option.option_id}
                      className="my-1 w-100 px-3"
                      style={{ fontSize: '18px' }}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: option.default_value,
                        }}
                      ></span>
                    </div>
                  )}
                </Col>
              </Row>
            );
          })}
          <Row className="mb-2 d-flex align-items-center">
            <Col xs={4}>Betrag:</Col>
            <Col>
              <b>
                {price.toString().replace('.', ',')}{' '}
                {props.voucher.currency_code}{' '}
                {props.shippingMethod === 'physical'
                  ? `(+${props.voucher.physical_voucher_price.total}€ Versand und Druck)`
                  : ''}
              </b>
              {estimateLoading && (
                <Spinner
                  animation="grow"
                  size="sm"
                  style={{ position: 'relative', top: '-3px' }}
                />
              )}
            </Col>
          </Row>
        </>
      );
    case 'dropdown':
      return (
        <Fragment>
          <label className="custominput-label">Betrag</label>
          <Form.Control
            className="custominput"
            as="select"
            id="amountSelection"
            custom
            onChange={(e) => setAmount(e.target.value)}
          >
            {pc.options.map((o) => {
              return (
                <option value={o} key={`am_s_${o}`}>
                  {o} {props.voucher.currency_code}
                </option>
              );
            })}
          </Form.Control>
          {props.shippingMethod === 'physical' && (
            <>
              (+ {props.voucher.physical_voucher_price.total}€ Versand
              und Druck)
            </>
          )}
        </Fragment>
      );
  }
};
