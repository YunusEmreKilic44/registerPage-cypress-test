import axios from "axios";
import { useEffect, useState } from "react";
import {
  Input,
  Form,
  Label,
  FormGroup,
  FormText,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormFeedback,
  CardFooter,
} from "reactstrap";

const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
};

export const errorMessages = {
  ad: "En az 3 karakter giriniz",
  soyad: "En az 3 karakter giriniz",
  email: "Gecerli bir email giriniz",
  password:
    "En az 8 karakter,en az 1 büyük harf ve küçük harf, en az 1 sembol ve en az 1 rakam içermelidir giriniz",
};

const Register = () => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
  });

  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  useEffect(() => {
    if (
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 3 &&
      validateEmail(formData.email) &&
      regex.test(formData.password)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name == "ad" || name == "soyad") {
      if (value.trim().length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name == "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name == "password") {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    axios
      .post("https://reqres.in/api/users", formData, {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      })
      .then((response) => {
        console.log(response);
        setFormData(initialValues);
        setId(response.data.id);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <Card>
      <CardHeader>Kayıt ol</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="ad">Ad:</Label>
            <Input
              onChange={handleChange}
              value={formData.ad}
              id="ad"
              name="ad"
              placeholder="Adınızı Giriniz"
              type="text"
              invalid={errors.ad}
              data-cy="ad-input"
            />
            {errors.ad && (
              <FormFeedback data-cy="error-message">
                {errorMessages.ad}
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="soyad">Soyad:</Label>
            <Input
              value={formData.soyad}
              onChange={handleChange}
              id="soyad"
              name="soyad"
              placeholder="Soyadınızı Giriniz"
              type="text"
              invalid={errors.soyad}
              data-cy="soyad-input"
            />
            {errors.soyad && (
              <FormFeedback data-cy="error-message">
                {errorMessages.soyad}
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email:</Label>
            <Input
              value={formData.email}
              onChange={handleChange}
              id="email"
              name="email"
              placeholder="Emailinizi Giriniz"
              type="email"
              invalid={errors.email}
              data-cy="email-input"
            />
            {errors.email && (
              <FormFeedback data-cy="error-message">
                {errorMessages.email}
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              value={formData.password}
              onChange={handleChange}
              id="password"
              name="password"
              placeholder="Şifrenizi Giriniz"
              type="password"
              invalid={errors.password}
              data-cy="password-input"
            />
            {errors.password && (
              <FormFeedback data-cy="error-message">
                {errorMessages.password}
              </FormFeedback>
            )}
          </FormGroup>

          <Button data-cy="submit-button" disabled={!isValid}>
            Kayıt Ol
          </Button>
        </Form>
      </CardBody>
      {id && (
        <CardFooter data-cy="response-message">Kullanıcı id: {id}</CardFooter>
      )}
    </Card>
  );
};

export default Register;
