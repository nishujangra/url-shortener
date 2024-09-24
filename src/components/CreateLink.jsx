import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UrlState } from "@/context";

import { QRCode } from 'react-qrcode-logo';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "@/components/Error";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/db/apiUrls";

const DOMAIN = import.meta.env.VITE_APP_DOMAIN;


const CreateLink = () => {
    const { user } = UrlState();
    const navigate = useNavigate();
    const ref = useRef();

    let [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup
            .string()
            .url("Must be a valid URL")
            .required("Long URL is required"),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.id]: e.target.value });
    };

    const { data, loading, error, fn: fnCreateUrl } = useFetch(createUrl, { ...formValues, user_id: user.id });

    useEffect(() => {
        if (error === null && data) {
            navigate(`/link/${data[0].id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, data]);

    const createNewLink = async () => {
        setErrors([]);
        try {
            await schema.validate(formValues, { abortEarly: false });

            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fnCreateUrl(blob);
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    }

    return (
        <div>
            <Dialog
                defaultOpen={longLink ? true : false}
                onOpenChange={(res) => {
                    if (!res) {
                        setSearchParams({});
                    }
                }}
            >
                <DialogTrigger>
                    <Button variant='destructive'>Create New Link</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className='flex flex-col gap-4'>
                        <DialogTitle className='mb-2 font-bold text-2xl'>Create New</DialogTitle>
                    </DialogHeader>

                    <div className="flex items-center justify-center">
                        {formValues?.longUrl && (
                            <QRCode ref={ref} size={250} value={formValues?.longUrl} />
                        )}
                    </div>

                    <Input
                        id="title"
                        placeholder="Short Link's Title"
                        value={formValues.title}
                        onChange={handleChange}
                    />
                    {errors.title && <Error message={errors.title} />}
                    <Input
                        id="longUrl"
                        placeholder="Enter your Loooong URL"
                        value={formValues.longUrl}
                        onChange={handleChange}
                    />
                    {errors.longUrl && <Error message={errors.longUrl} />}
                    <div className="flex items-center gap-2">
                        <Card className="p-2">{DOMAIN}</Card> /
                        <Input
                            id="customUrl"
                            placeholder="Custom Link (optional)"
                            value={formValues.customUrl}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <Error message={errors.message} />}

                    <DialogFooter>
                        <Button
                            type="button"
                            className='w-full'
                            variant="destructive"
                            onClick={createNewLink}
                            disabled={loading}
                        >
                            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateLink
