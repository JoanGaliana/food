import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import Food from "../../model/Food";
import SearchFood from "../SearchFood/SearchFood";

type params = {
    onClose: () => void,
    isOpen: boolean,
    selectFood: (food: Food) => void, selectFoodButtonText: string
}

const FindFoodModal: React.FC<params> = ({ onClose, isOpen, selectFood, selectFoodButtonText }) => {
    return <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent my={0}>
            <ModalCloseButton />
            <ModalHeader>Search Food</ModalHeader>
            <ModalBody>
                <SearchFood
                    onFoodSelect={(food) => {
                        selectFood(food);
                        onClose();
                    }}
                    buttonText={selectFoodButtonText}
                ></SearchFood>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose} colorScheme="red">Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>;
}



export default FindFoodModal;
