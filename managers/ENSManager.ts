import { ENS } from '@ensdomains/ensjs';

class ENSManager {
  ENSInstance = new ENS();
  initialize = (provider: any) => {
    this.ENSInstance.setProvider(provider);
  };

  setAvatar = (ensAddress: string, davatarURL: string) => {
    return this.ENSInstance.setRecords(ensAddress, {
      texts: [{ key: 'avatar', value: davatarURL }],
    });
  };
}

export default new ENSManager();
