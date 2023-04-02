import Image from 'next/image';
import { useState, useEffect } from 'react';
// import ''

function formatString(inputString) {
    const prefix = '../../../';
    const formattedString = inputString.replace(prefix, '/');
    return formattedString + '.png';
}

function getColorHexCode(colorName) {
    const colorMap = {
      Silver: "#C0C0C0",
      Brass: "#B5A642",
      Gold: "#FFD700",
    };

    return colorMap[colorName] || "";
  }

  function secondsToHms(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hh = hours.toString().padStart(2, '0');
    const mm = minutes.toString().padStart(2, '0');
    const ss = remainingSeconds.toString().padStart(2, '0');

    return `${hh} h ${mm} min ${ss} s`;
  }


const index = () => {
    const [products, setProducts] = useState(null);

    //This function gets the inventory
    async function getItems(setProducts) {
        const url = 'http://185.98.136.60:9090/races/all/6';
        const token = 'TOKEN';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }
        });

        const data = await response.json();

        setProducts(data);

        console.log('races', data);

        return data;
    }

    useEffect(() => {
        getItems(setProducts);
    }, []);

    return (
        <div className="grid">
            {products?.map((product) => (
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">{product?.name}</span>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: 'fit-content', paddingRight: '.5rem', paddingLeft: '.5rem', height: '2.5rem' }}>
                                <p className="text-purple-500 text-lg">Laps : {product?.laps}</p>
                            </div>
                        </div>
                        <img src={`/assets/races/${product?.image}.svg`} alt="Example image" width={200} height={200} />

                        <ul className="list-none p-0 m-0">
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Medals</span>
                                </div>
                                <div>
                                    {
                                        product?.medals?.map((medal) => (
                                            <div style={{ width:"10px", height:"10px", backgroundColor:`${getColorHexCode(medal.type)}`}}></div>
                                        ))

                                    }
                                </div>

                            </li>

                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Time </span>

                                <div>
                                    {
                                        secondsToHms(product?.medals[product?.medals?.length - 1]?.timeToObtain)

                                    }
                                </div>
                            </div>
                            </li>

                            {/* <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Energy</span>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-cyan-500 h-full" style={{ width: `${product?.statistiques?.find((x) => x?.type === 'Energy consumption')?.value.toString()}%` }} />
                                    </div>
                                    <span className="text-orange-500 ml-3 font-medium">{product?.statistiques?.find((x) => x?.type === 'Energy consumption')?.value.toString()}</span>{' '}
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Grip</span>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-pink-500 h-full" style={{ width: `${product?.statistiques?.find((x) => x?.type === 'Grip')?.value.toString()}%` }} />
                                    </div>
                                    <span className="text-orange-500 ml-3 font-medium">{product?.statistiques?.find((x) => x?.type === 'Grip')?.value.toString()}</span>{' '}
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Handling Ability</span>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-green-500 h-full" style={{ width: `${product?.statistiques?.find((x) => x?.type === 'Handling ability')?.value.toString()}%` }} />
                                    </div>
                                    <span className="text-orange-500 ml-3 font-medium">{product?.statistiques?.find((x) => x?.type === 'Handling ability')?.value.toString()}</span>{' '}
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Power</span>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-purple-500 h-full" style={{ width: `${product?.statistiques?.find((x) => x?.type === 'Power')?.value.toString()}%` }} />
                                    </div>
                                    <span className="text-orange-500 ml-3 font-medium">{product?.statistiques?.find((x) => x?.type === 'Power')?.value.toString()}</span>{' '}
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">weight</span>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                                        <div className="bg-teal-500 h-full" style={{ width: `${product?.statistiques?.find((x) => x?.type === 'Weight')?.value.toString()}%` }} />
                                    </div>
                                    <span className="text-orange-500 ml-3 font-medium">{product?.statistiques?.find((x) => x?.type === 'Weight')?.value.toString()}</span>{' '}
                                </div>
                            </li> */}
                        </ul>

                        <div class="bouton-centre">
                            <button aria-label="Help" className="p-button p-component p-button-help">
                                <span class="p-button-label p-c">Sell</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default index;
