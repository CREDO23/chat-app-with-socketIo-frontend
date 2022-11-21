import toast from "../toasty";
export default async function (img: FileList): Promise<string> {
    let url = '';
    const toMb = 1024 * 1024;

    if (img[0]) {

        if(img[0].size / toMb > 1.5){
            toast.info('Image provfil over 1.5 mb')
        }else{
            const data = new FormData();

            console.log(img[0].size);
    
            data.append('file', img[0]);
            data.append('upload_preset', 'chat-app');
            data.append('cloud_name', 'dyj1vowdv');
    
            await fetch('https://api.cloudinary.com/v1_1/dyj1vowdv/image/upload', {
                method: 'POST',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => (url = data.secure_url));
        }
       
    }

    return url as string;
}
