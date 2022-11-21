export default async function (img: File): Promise<void> {
    const data = new FormData();

    data.append('file', img);
    data.append('upload_preset', 'chat-app');
    data.append('cloud_name', 'dyj1vowdv');

    await fetch('https://api.cloudinary.com/v1_1/dyj1vowdv/image/upload', {
        method: 'POST',
        body: data,
    })
        .then((res) => res.json())
        .then(data => console.log(data));
}
