import Tinlake from 'tinlake';
import contractAddresses from './addresses_tinlake.json';
import Eth from 'ethjs';

declare var web3: any;

const portisConfig = {
  id: '2ea2735d-4963-40f5-823f-48cab29f7319', // required
  // network: 'mainnet', // optional
  network: 'kovan', // optional
};

const walletConnectConfig = {
  // bridge: "https://bridge.walletconnect.org" // optional
};

const fortmaticConfig = {
  // key: "FORTMATIC_KEY", // required
  // network: "mainnet" // optional
};

let tinlake: Tinlake | null = null;
let authed = false;

export async function getTinlake() {
  if (tinlake) { return tinlake; }

  const provider = new Eth.HttpProvider(
    'https://kovan.infura.io/v3/092108ec6aea46ab97b2175b45130455');

  tinlake = new Tinlake(provider, contractAddresses, {});

  return tinlake;
}

export async function authTinlake() {
  if (!tinlake) { await getTinlake(); }
  if (authed) { return; }

  const provider = await web3ConnectToLast();

  const accounts = await provider.enable();
  const account = accounts[0];
  console.log(`Using account ${account}`);

  tinlake!.setProvider(provider);
  tinlake!.setEthConfig({ from: account });

  authed = true;
}

async function web3Connect(): Promise<any> {
  return new Promise((resolve, reject) => {
    // require here since we only want it to be loaded in browser, not on server side rendering
    const Web3Connect = require('web3connect').default;

    const web3Connect = new Web3Connect.Core({
      providerOptions: {
        portis: portisConfig,
        // fortmatic: {
        //   key: 'FORTMATIC_KEY', // required
        // },
      },
    });

    // subscibe to connect
    web3Connect.on('connect', (provider: any) => {
      const info = Web3Connect.getProviderInfo(provider);

      // console.log({ info });

      sessionStorage.setItem('chosenProvider', info.type === 'injected' ? 'injected' : info.name);

      resolve(provider);
    });

    // subscibe to close
    web3Connect.on('close', () => {
      reject('Web3Connect Modal Closed');
    });

    // open modal
    web3Connect.toggleModal();
  });
}

async function web3ConnectToLast(): Promise<any> {
  const chosenProvider = sessionStorage.getItem('chosenProvider');

  if (!chosenProvider) { return web3Connect(); }

  // require here since we only want it to be loaded in browser, not on server side rendering
  const Web3Connect = require('web3connect').default;

  switch (chosenProvider) {
    case 'Portis':
      return Web3Connect.ConnectToPortis(portisConfig);
    case 'WalletConnect':
      return Web3Connect.ConnectToWalletConnect(walletConnectConfig);
    case 'Fortmatic':
      return Web3Connect.ConnectToFortmatic(fortmaticConfig);
    case 'injected':
      return Web3Connect.ConnectToInjected();
    default:
      return web3Connect();
  }
}
