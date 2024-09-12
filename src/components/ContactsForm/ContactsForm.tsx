import React, { useRef, useState } from "react";
import "./ContactsForm.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hooks/reduxHooks.ts";
import {
  selectProjects,
  setContactsForm,
} from "../../redux/slices/projects.slice.ts";
import cn from "classnames";
import { createNewClient } from "../../api/clients.ts";
import { Inputs } from "../../types/inputs.ts";
import { Link } from "react-router-dom";
import { createNewReqruit } from "../../api/reqruit.ts";

export const ContactsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectLanguage } = useAppSelector(selectProjects);
  const [joinTeam, setJoinTeam] = useState(false);
  const [doneRequest, setDoneRequest] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cvlink, setCvlink] = useState("");
  const [comment, setComment] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cvlinkError, setCvlinkError] = useState("");
  const [commentError, setCommentError] = useState("");

  const form = useRef<HTMLFormElement | null>(null);

  const resetError = () => {
    setNameError("");
    setPhoneError("");
    setEmailError("");
    setCvlinkError("");
    setCommentError("");
  };

  const resetInput = () => {
    setName("");
    setPhone("");
    setEmail("");
    setCvlink("");
    setComment("");
  };

  const reset = () => {
    resetError();
    resetInput();
  };

  const handleSwitchButtonConversation = () => {
    setJoinTeam(false);
    reset();
  };

  const handleSwitchButtonJoinTeam = () => {
    setJoinTeam(true);
    reset();
  };

  const handleInputChange = (
    inputName,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    resetError();

    switch (inputName) {
      case Inputs.name:
        setName(event.target.value);

        break;

      case Inputs.phone:
        setPhone(event.target.value);

        break;

      case Inputs.email:
        setEmail(event.target.value);

        break;

      case Inputs.cvlink:
        setCvlink(event.target.value);

        break;
    }
  };

  const handleSubmitForm = (name, phone, email, comments, cvlink) => {
    let patternOfNumber = /^\d+$/;
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    console.log(cvlink);

    if (joinTeam) {
      if (
        !name ||
        !phone ||
        !email ||
        !email.includes("@") ||
        !cvlink ||
        !comments
      ) {
        if (!name) {
          setNameError(`${selectLanguage.nameError}`);
        }
        if (!phone || !patternOfNumber.test(phone)) {
          setPhoneError(`${selectLanguage.phoneError}`);
        }
        if (!email || !email.includes("@")) {
          setEmailError(`${selectLanguage.emailError}`);
        }
        if (!cvlink || !urlPattern.test(cvlink)) {
          setCvlinkError(`${selectLanguage.cvlinkError}`);
        }
        if (!comments) {
          setCommentError(`${selectLanguage.commentError}`);
        }

        console.log("error");
        return;
      }

      const newReqruit = {
        name,
        phone,
        email,
        comments,
        cvlink,
      };

      console.log(newReqruit);

      createNewReqruit(newReqruit).then((client) => console.log(client));

      reset();
      setDoneRequest(true);

      return;
    }

    if (!name || !phone || !email || !email.includes("@")) {
      if (!name) {
        setNameError(`${selectLanguage.nameError}`);
      }
      if (!phone || !patternOfNumber.test(phone)) {
        setPhoneError(`${selectLanguage.phoneError}`);
      }
      if (!email || !email.includes("@")) {
        setEmailError(`${selectLanguage.emailError}`);
      }

      console.log("error");
      return;
    }

    const newClient = {
      name,
      phone,
      email,
      comment: comments,
    };

    console.log(newClient);

    createNewClient(newClient).then((client) => console.log(client));

    reset();
    setDoneRequest(true);
  };

  const handleClickCloseContact = () => {
    console.log("close");
    document.body.style.overflow = "auto";
    dispatch(setContactsForm(false));

    setDoneRequest(false);
  };

  return (
    <section
      onClick={(event) => handleClickCloseContact()}
      className="ContactsForm__center"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="ContactsFrom__container"
        id="ContactsFrom-container"
      >
        {doneRequest ? (
          <div className="ThankYou">
            <div className="ThankYou__container">
              <h3 className="ThankYou__title">Thank you for reaching out!</h3>
              <p className="ThankYou__text">
                We will contact you as soon as possible.
              </p>

              <div className="ThankYou__img__container">
                <div className="ThankYou__img"></div>
              </div>

              <Link
                className="ThankYou__link"
                onClick={() => handleClickCloseContact()}
                to={"/"}
              >
                return to the home
              </Link>
            </div>
          </div>
        ) : (
          <div className="ContactsForm">
            <h2 className="ContactsForm__title">{selectLanguage.letsTalk}</h2>

            <div className="ContactsForm__switcher">
              <button
                onClick={() => handleSwitchButtonConversation()}
                data-content={selectLanguage.buttonConversion}
                className={cn(
                  "ContactsForm__switcher__button ContactsForm__switcher__button--left",
                  { "ContactsForm__switcher__button--active": !joinTeam }
                )}
              ></button>

              <button
                onClick={() => handleSwitchButtonJoinTeam()}
                data-content={selectLanguage.joinTeam}
                className={cn(
                  "ContactsForm__switcher__button ContactsForm__switcher__button--right",
                  { "ContactsForm__switcher__button--active": joinTeam }
                )}
              ></button>
            </div>

            <form ref={form} className="ContactsForm__form" action="POST">
              <div className="ContactsForm__form__section">
                <label className="ContactsForm__form__label" htmlFor="name">
                  {selectLanguage.nameLabel}
                  {nameError && (
                    <p className="ContactsForm__form__label__error">
                      {nameError}
                    </p>
                  )}
                  <input
                    onChange={(event) => handleInputChange(Inputs.name, event)}
                    value={name}
                    className={cn("ContactsForm__form__input", {
                      "ContactsForm__form__input--error": nameError,
                    })}
                    minLength={4}
                    maxLength={40}
                    type="text"
                    id="name"
                    placeholder={selectLanguage.namePlaceholder}
                    required
                  />
                </label>

                <label className="ContactsForm__form__label" htmlFor="email">
                  {selectLanguage.emailLabel}
                  {emailError && (
                    <p className="ContactsForm__form__label__error">
                      {emailError}
                    </p>
                  )}
                  <input
                    onChange={(event) => handleInputChange(Inputs.email, event)}
                    value={email}
                    className={cn("ContactsForm__form__input", {
                      "ContactsForm__form__input--error": emailError,
                    })}
                    maxLength={100}
                    type="email"
                    id="email"
                    placeholder={selectLanguage.emailPlaceholder}
                    required
                  />
                </label>

                {joinTeam && (
                  <label className="ContactsForm__form__label" htmlFor="link">
                    {selectLanguage.linkLabel}
                    {cvlinkError && (
                      <p className="ContactsForm__form__label__error">
                        {cvlinkError}
                      </p>
                    )}
                    <input
                      onChange={(event) =>
                        handleInputChange(Inputs.cvlink, event)
                      }
                      value={cvlink}
                      className={cn("ContactsForm__form__input", {
                        "ContactsForm__form__input--error": cvlinkError,
                      })}
                      maxLength={500}
                      type="text"
                      id="link"
                      placeholder={selectLanguage.linkPlaceholder}
                      required
                    />
                  </label>
                )}
              </div>

              <div className="ContactsForm__form__section">
                <label className="ContactsForm__form__label" htmlFor="phone">
                  {selectLanguage.phoneLabel}
                  {phoneError && (
                    <p className="ContactsForm__form__label__error">
                      {phoneError}
                    </p>
                  )}
                  <input
                    onChange={(event) => handleInputChange(Inputs.phone, event)}
                    value={phone}
                    className={cn("ContactsForm__form__input", {
                      "ContactsForm__form__input--error": phoneError,
                    })}
                    maxLength={20}
                    type="text"
                    id="phone"
                    placeholder={selectLanguage.phonePlaceholder}
                    required
                  />
                </label>

                <label className="ContactsForm__form__label" htmlFor="comments">
                  {selectLanguage.commentLabel}
                  {commentError && (
                    <p className="ContactsForm__form__label__error">
                      {commentError}
                    </p>
                  )}
                  <textarea
                    onChange={(event) => setComment(event.target.value)}
                    value={comment}
                    className={cn("ContactsForm__form__textarea", {
                      "ContactsForm__form__textarea--error": commentError,
                    })}
                    name="comments"
                    minLength={10}
                    maxLength={600}
                    id="comments"
                    placeholder={selectLanguage.commentPlaceholder}
                  ></textarea>
                </label>
              </div>
            </form>

            <button
              onClick={() =>
                handleSubmitForm(name, phone, email, comment, cvlink)
              }
              className="ContactsForm__form__button"
              type="submit"
            >
              {selectLanguage.sendRequest}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
