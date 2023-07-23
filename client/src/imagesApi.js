import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app, { storage } from "./firebase";
import { toast } from "react-toastify";

export const uploadImage = async (fileName, setPercent, setImagesNames) => {
  if (!fileName) {
    alert("Please upload an image first!");
  }

  const imgName = new Date().getTime() + fileName.name;
  const storage = getStorage(app);
  const storageRef = ref(storage, imgName);
  const uploadTask = uploadBytesResumable(storageRef, fileName);

   uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setPercent(percent);
    },
    (err) => toast.error(err),
    () => {
       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
         setImagesNames((pre) => [...pre, url]);
      })
      .catch((err) => {
      });
    }
  );
};

export const deletImage = (imgName, setImagesNames) => {
  let imgRef = ref(storage, imgName);
   deleteObject(imgRef)
    .then(() => {
      setImagesNames((pre) => {
        return pre.filter((img) => {
          return img !== imgName;
        });
      });
    })
    .catch((err) => {
      toast.error(err);
    });
};
