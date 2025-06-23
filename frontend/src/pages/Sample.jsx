
const Sample = () => {
  const sample = [
    {
      id: 1,
      name: "Men",
      image:
        "https://stylegirlfriend.com/wp-content/uploads/2024/01/thomasopdebeeck-jeans-outfit.jpg",
    },
    {
      id: 2,
      name: "Women",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtXfzmaF01G2pMklVTP1EGST24xYxa90gOa2WH1RX1_xlbgf1PZYL001S2i1otkSk-AyA&usqp=CAU",
    },
    {
      id: 3,
      name: "Kids",
      image:
        "https://i.pinimg.com/236x/5a/da/da/5adada9dd3b21c8a70be7a916edf30bb.jpg",
    },
    {
      id: 4,
      name: "Others",
      image:
        "https://cdn.jovani.com/wp-content/uploads/Best-Prom-Dress-Accessories-for-2024.png",
    },
  ];
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-6">
        {sample.map((product) => (
          <div
            key={product.id}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-80 h-80 object-cover mb-3 rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sample;
