import { SenderProvider } from "../interfaces/sender.provider.interface";

export class XptoSenderProvider implements SenderProvider {
  send() {
    console.log("enviei via XTPO");
  }
}