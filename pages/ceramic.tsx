import {
  useViewerConnection,
  EthereumAuthProvider,
  useClient,
} from '@self.id/framework';
import { useViewerRecord } from '@self.id/react';
import { uploadImage } from '@self.id/image-utils';
// import { EthereumAuthProvider, SelfID } from '@self.id/web'
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

function ShowViewerName() {
  const record = useViewerRecord('basicProfile');

  const text = record.isLoading
    ? 'Loading...'
    : record.content
    ? `Hello ${record.content.name || 'stranger'}`
    : 'No profile to load';
  return <p>{text}</p>;
}

// The `file` argument must implement the File interface from
// https://developer.mozilla.org/en-US/docs/Web/API/File
async function setProfileImage(selfID: any, file: any) {
  const imageSources = await uploadImage(
    'https://ipfs.infura.io:5001/api/v0',
    file,
    [
      { width: 60, height: 60 },
      { width: 200, height: 200 },
    ]
  );
  // Here `selfID` must be an instance of `SelfID` from the `web` module
  await selfID.merge({ image: imageSources });
}

const BRIAN_IMG_URL =
  'https://pbs.twimg.com/profile_images/1237620200821805057/n52DTaCC_400x400.jpg';
const IPFS_TEST_URL =
  'ipfs://Qmf5EyNVjK8ASi1GmUukFbUSf5oEKQvNSHQE8pZobb2mVf/889.png';

const CeramicPage: NextPage = () => {
  const router = useRouter();
  const [connection, connect, disconnect] = useViewerConnection();
  const record = useViewerRecord('basicProfile');
  const client = useClient();

  const connectionButton = () => {
    const ethereumInWindow = true; //'ethereum' in window;

    return connection.status === 'connected' ? (
      <button
        onClick={() => {
          disconnect();
        }}
      >
        Disconnect ({connection.selfID.id})
      </button>
    ) : ethereumInWindow ? (
      <button
        disabled={connection.status === 'connecting'}
        onClick={async () => {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          await connect(new EthereumAuthProvider(window.ethereum, accounts[0]));
        }}
      >
        Connect
      </button>
    ) : (
      <p>
        An injected Ethereum provider such as{' '}
        <a href="https://metamask.io/">MetaMask</a> is needed to authenticate.
      </p>
    );
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          router.push('/account/edit');
          window.location.reload();
        }}
      >
        Edit My Account
      </button>
      {connectionButton()}
      <p>{record.isLoading ? 'Loading...' : JSON.stringify(record.content)}</p>
      <button
        onClick={() => {
          // fetch(BRIAN_IMG_URL).then((data) => {
          //   data.blob().then((blob) => {
          //     console.log(blob);
          //     // https://github.com/ceramicnetwork/CIP/blob/main/CIPs/CIP-19/CIP-19.md

          //   });
          // });

          // setting the profile picture clears the name if you don't set it
          // https://github.com/ceramicnetwork/CIP/blob/main/CIPs/CIP-19/CIP-19.md
          client._dataStore.set('basicProfile', {
            image: {
              original: {
                src: IPFS_TEST_URL,
                mimeType: 'image/png',
                width: 160,
                height: 160,
              },
            },
          });

          // client._dataStore.set('basicProfile', {
          //   name: 'Brian Li',
          // });
        }}
      >
        save image client
      </button>
    </div>
  );
};

export default CeramicPage;
