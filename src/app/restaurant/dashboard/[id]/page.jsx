'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateFoodItems = (props) => {

    console.log(props.params.id);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false)
    const router = useRouter();

    useEffect(() => {
        handleLoadFoodItem();
    }, [])

    const handleLoadFoodItem = async () => {
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + props.params.id);
        response = await response.json();
        if (response.success) {
            console.log(response.result);
            setName(response.result.name)
            setPrice(response.result.price)
            setPath(response.result.path)
            setDescription(response.result.description)
        }
    }

    const handleEditFoodItem = async () => {
        console.log(name, price, path, description);
        if (!name || !path || !price || !description) {
            setError(true);
            return false
        } else {
            setError(false)
        }

        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + props.params.id,{
            method:'PUT',
            body:JSON.stringify({name,price,path,description})
        });
        response = await response.json();
        if(response.success){
            router.push('../dashboard')
        }else{
            alert("data is not updated please try again")
        }


    }

    return (<div className="edit-form-container">
        <div className="form">
        <h1> Update Food Item</h1>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter food name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <p className="input-error">Please enter valid name</p>}
        </div>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter price"
                value={price} onChange={(e) => setPrice(e.target.value)}
                />
                {error && !price && <p className="input-error">Please enter valid price</p>}

        </div>
        <div className="input-wrapper">
            <input type="text" className="input-field" placeholder="Enter description"
                value={description} onChange={(e) => setDescription(e.target.value)}
            />
            {error && !description && <p className="input-error">Please enter valid description</p>}

        </div>
        <div className="edit-button-wrapper">
            <button className="button" onClick={handleEditFoodItem}>Update Food Item</button>
            <button className="button" onClick={() => router.push('../dashboard')}>Back to Food Item list</button>
        </div>

        </div>
    </div>)
}

export default UpdateFoodItems;