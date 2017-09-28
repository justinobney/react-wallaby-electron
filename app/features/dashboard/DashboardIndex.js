import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {BasicPage} from '../../styles';

const Serialport = require('serialport');

class DashboardIndex extends Component {
  state = {
    ports: [],
  };
  componentWillMount() {
    Serialport.list((err, ports) => {
      this.setState({ports});
    });
  }
  _activate = portData => {
    const port = new Serialport(portData.comName, {autoOpen: false, baudRate: 115200});
    const Readline = Serialport.parsers.Readline;
    const parser = port.pipe(new Readline());

    port.open(err => {
      if (err) {
        return console.log('Error opening port: ', err.message);
      }
      readCard();
    });

    parser.on('data', data => {
      const cardNumber = data.toString('utf8');
      const stringEsc = String.fromCharCode(27);
      port.write(stringEsc);
      port.write('\r\n');
      port.write(`${cardNumber}\r\n`);
      port.write(`${cardNumber}\r\n`);
      port.write('\r\n\r\n\r\n\r\n');

      readCard();
    });

    function readCard() {
      const readCommand = `${String.fromCharCode(27)}m996${String.fromCharCode(13)}`;
      port.write(readCommand, err => {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        console.log('message written');
      });
    }
  };
  render() {
    return (
      <BasicPage header="Dashboard">
        <Table celled padded striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>COM Name</Table.HeaderCell>
              <Table.HeaderCell>Manufacturer</Table.HeaderCell>
              <Table.HeaderCell>Product Id</Table.HeaderCell>
              <Table.HeaderCell>Serial Number</Table.HeaderCell>
              <Table.HeaderCell>Vendor Id</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.ports.map(x => (
              <Table.Row key={x.pnpId}>
                <Table.Cell>{x.comName}</Table.Cell>
                <Table.Cell>{x.manufacturer}</Table.Cell>
                <Table.Cell>{x.productId}</Table.Cell>
                <Table.Cell>{x.serialNumber}</Table.Cell>
                <Table.Cell>{x.vendorId}</Table.Cell>
                <Table.Cell collapsing>
                  <Button onClick={() => this._activate(x)}>Activate Card Reader</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </BasicPage>
    );
  }
}

export default DashboardIndex;
