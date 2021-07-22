import React, { useState } from "react";
import './CardUser.scss';
import { Address, User } from './../../models/UserAddress';
// import { Action } from "../../redux/actions";
// import { Dispatch } from "redux"


/* interface StateProps {
    isOn: boolean
  } */

/* interface DispatchProps {
  deleteUser: (dispatch: Dispatch<Action>) => Promise<void>
}
 
interface OwnProps {
  model: User
} */

/* const mapState = (state: RootStore) => ({
  isOn: state.isOn,
}) */

/* const mapDispatch = {
  toggleOn: (id: number) => ({ 
      type: 'TOGGLE_IS_ON'
  }),
} */

//   type Props = StateProps & DispatchProps & OwnProps

const CardUser = (props: {
    model: User,
    onDeleteClicked: (criteria: number) => void,
    onClickSave: (id: number, user: User) => void
}) => {

    const [isReadOnly, setIsReadOnly] = useState(true);
    const [submitChange, setSubmitChange] = useState(false);
    const [name, setName] = useState(props.model.name);
    const [country, setCountry] = useState(props.model.address.country);
    const [city, setCity] = useState(props.model.address.city);
    const [phoneNumber, setPhoneNumber] = useState(props.model.phoneNumber);
    const [street, setStreet] = useState(props.model.address.street);
    const [zipcode, setZipcode] = useState(props.model.address.zipcode);
    const [email, setEmail] = useState(props.model.email);

    const enableUserEdition = () => {
        setIsReadOnly(false);
    }

    const saveChanges = () => {
        console.log('saveChanges');
        setSubmitChange(true);

        if (!isFormValid()) return;

        const address = new Address();
        address.country = country;
        address.city = city;
        address.street = street;
        address.zipcode = zipcode;

        const user = new User();
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.address = address;

        props.onClickSave(props.model.id, user);
    }

    const removeUser = () => {
        console.log('removeUser: ', props.model.id);
        props.onDeleteClicked(props.model.id);
    }

    const isFormValid = (): boolean => {
        let formIsValid: boolean = true;

        //Name
        if (!name) {
            formIsValid = false;
        }

        //Email
        if (!email || !validateEmail()) {
            formIsValid = false;
        }

        if (!country) {
            formIsValid = false;
        }

        if (!city) {
            formIsValid = false;
        }

        if (!phoneNumber) {
            formIsValid = false;
        }

        if (!street) {
            formIsValid = false;
        }

        if (!zipcode) {
            formIsValid = false;
        }

        return formIsValid;
    }

    const validateEmail = (): boolean => {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <div className="card-container info p-2 mx-3 mb-4">
            <div>
                <img src="./images/user.png" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="mr-2">
                <label className="pl-2" htmlFor={"name" + props.model.id}>Name</label>
                <input className={`p-2 ${submitChange && !name ? 'invalid-field' : ''}`} type="text"
                    id={"name" + props.model.id} name={"name" + props.model.id} value={name}
                    onChange={(e) => setName(e.target.value)} readOnly={isReadOnly} />
            </div>
            <div className="mr-2">
                <label className="pl-2" htmlFor={"country" + props.model.id}>Country</label>
                <input className={`p-2 ${submitChange && !country ? 'invalid-field' : ''}`} type="text" id={"country" + props.model.id}
                    name={"country" + props.model.id} value={country}
                    onChange={(e) => setCountry(e.target.value)} readOnly={isReadOnly} />
            </div>
            <div className="mr-2">
                <label className="pl-2" htmlFor={"city" + props.model.id}>City</label>
                <input className={`p-2 ${submitChange && !city ? 'invalid-field' : ''}`} type="text"
                    id={"city" + props.model.id} name={"city" + props.model.id} value={city}
                    onChange={(e) => setCity(e.target.value)} readOnly={isReadOnly} />
            </div>
            <div className="mr-2">
                <label className="pl-2" htmlFor={"phoneNumber" + props.model.id}>Phone Number</label>
                <input className={`p-2 ${submitChange && !phoneNumber ? 'invalid-field' : ''}`} type="text"
                    id={"phoneNumber" + props.model.id} name={"phoneNumber" + props.model.id} value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} readOnly={isReadOnly} />
            </div>
            <div className="mr-2">
                <label className="pl-2" htmlFor={"street" + props.model.id}>Street</label>
                <input className={`p-2 ${submitChange && !street ? 'invalid-field' : ''}`} type="text"
                    id={"street" + props.model.id} name={"street" + props.model.id} value={street}
                    onChange={(e) => setStreet(e.target.value)} readOnly={isReadOnly} />
            </div>
            <div className="mr-2">
                <label className="pl-2" htmlFor={"zipcode" + props.model.id}>Zip Code</label>
                <input className={`p-2 ${submitChange && !zipcode ? 'invalid-field' : ''}`} type="text"
                    id={"zipcode" + props.model.id} name={"zipcode" + props.model.id} value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)} readOnly={isReadOnly} />
            </div>
            <div className="mr-2">
                <label className="pl-2" htmlFor={"email" + props.model.id}>Email</label>
                <input className={`p-2 ${submitChange && !email ? 'invalid-field' : ''}`} type="email"
                    id={"email" + props.model.id} name={"email" + props.model.id} value={email}
                    onChange={(e) => setEmail(e.target.value)} readOnly={isReadOnly} />
            </div>
            <div className="text-center">
                {isReadOnly ?
                    <button type="button" className="btn btn-link" onClick={enableUserEdition}>
                        Edit
                    </button>
                    :
                    <button type="button" className="btn btn-link" onClick={saveChanges}>
                        Save
                    </button>
                }

                <button type="button" className="btn btn-link" onClick={removeUser}>
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CardUser;
