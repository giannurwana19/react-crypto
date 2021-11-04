import { useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(data?.data?.coins);

  if (isFetching) return 'Loading...';

  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map(currency => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}>
            <Link to={`crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt={currency.name}
                    src={currency.iconUrl}
                  />
                }
                hoverable>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
