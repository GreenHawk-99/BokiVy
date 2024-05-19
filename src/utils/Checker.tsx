export const imageData: { [key: string]: string } = {
    "Minecraft":        "https://cdn2.steamgriddb.com/grid/726c858fb9844f1d203177e1bebdff2d.png",
    "Factorio":         "https://cdn2.steamgriddb.com/grid/7243ae4f43952c53cdf3431a72c6077d.webp",
    "Starbound":        "https://cdn2.steamgriddb.com/grid/b4811a39a9a0d9464b7f0957014efa13.webp",
    "Project Zomboid":  "https://cdn2.steamgriddb.com/grid/13837b20f1b3dc94dad85700535f1bbd.png",
    "V Rising":         "https://cdn2.steamgriddb.com/grid/6e229087fceb7bdacb84a0102f33cabe.jpg",
    "Astroneer":        "https://cdn2.steamgriddb.com/grid/4af0e3f08d279f5e0fa660bc86b70c78.png",
    "Core Kepper":      "https://cdn2.steamgriddb.com/grid/dc24c4971d18ed50c7661e5d095f3208.jpg",
    "Abiotic Factor":   "https://cdn2.steamgriddb.com/grid/bf59a016848f7a71e8af3e1ec6bc2a2d.png",
    "Valheim":          "https://cdn2.steamgriddb.com/grid/4d3c78c76d23605bcb78a135cef357ae.webp",
    "Counter Strike 2": "https://cdn2.steamgriddb.com/grid/0662aa1719017e0efa5fa8daf0880c6e.png",
};

const imageChecker = (name: string): string => {
    if (imageData[name] != null) {
        return imageData[name].valueOf();
    } else {
        return "https://cdn2.steamgriddb.com/grid/39c2966989c4f0091a99eef7f1d09c09.png";
    }
};

export const imageRender = (name: string) => {
    return (
        <img alt={name + " Thumbnail"}
             src={imageChecker(name)}/>
    )
}