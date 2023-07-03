import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { metadata } from "tauri-plugin-fs-extra-api";

const readFiles = async (path: string) => {
  return await readDir(path, { recursive: false });
};

const readMetadata = async (path: string) => {
  return await metadata(path);
};

async function App() {

  let buffer: string[] = ["/home/ksj/syncdirs"];
  let item : string | undefined = buffer.slice(-1)[0];
  buffer = buffer.slice(0, -1);

  while (item) {
    await readFiles(item)
      .then(async (entry) => {
        let item2 : FileEntry | undefined = entry.slice(-1)[0]
        entry=entry.slice(0, -1)

        while (item2) {
          let pth = item2.path;
          await readMetadata(pth)
            .then(async (entry) => {
              if (entry.isDir) {
                buffer = [...buffer, pth];
              }

            })
            .catch((e) => {
              console.log("1")
              console.log(e);
              console.log("2")
            });

          item2 = entry.slice(-1)[0];
          entry=entry.slice(0, -1)
        }
      })
      .catch((e) => {
        console.log("3")
        console.log(e);
        console.log("4")
      });

    item = buffer.slice(-1)[0];
    buffer=buffer.slice(0, -1)
  }

  return <></>
};

export default App;
