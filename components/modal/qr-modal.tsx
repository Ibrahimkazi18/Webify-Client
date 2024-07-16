"use client"

import { useEffect, useState } from "react"
import Modal from "@/components/modal"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface QrModalProps {
    isOpen : boolean,
    onClose : () => void,
    onConfirm : () => void,
    loading: boolean,
    src : string,
    total : number,
}

export const QrModal = ({isOpen, onClose, onConfirm, loading, src, total} : QrModalProps) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null;
    }

    return (
        <Modal title={`Total Amount : ₹${total}`} description="This action cannot be undone!.. Click the done button when payment is completed we will reach out to you after few hours of transaction..." isOpen={isOpen} onClose={onClose}>
            <div className="flex w-full items-center justify-center m-4">
                <Image src={src} alt="qr" width={300} height={300}/>
            </div>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant={"outline"} onClick={onClose}>Cancel</Button>
                <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>Confirm</Button>
            </div>
        </Modal>
    )
} 