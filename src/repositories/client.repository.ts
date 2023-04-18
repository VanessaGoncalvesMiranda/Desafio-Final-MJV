import { IClient, Client } from '../models/client.model';

class ClientRepository {
    getAll() {
        return Client.find();
    }

    getByDocument(document: string) {
        return Client.findOne({ document: document });
    }

    create(client: IClient) {
        return Client.create(client);
    }

    update(document: string, client: Partial<IClient>) {
        return Client.updateOne({ document: document }, { $set: client });
    }

    remove(document: string) {
        return Client.deleteOne({ document: document });
    }
}

export default new ClientRepository();