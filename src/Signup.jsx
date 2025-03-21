import React, { useRef, useState } from "react"
import { useRive, useStateMachineInput } from "@rive-app/react-canvas"

const Signup = () => {
    const nameRef = useRef()
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [isObscureText, setIsObscureText] = useState(true)

    // Initialize Rive Animation
    const { RiveComponent, rive } = useRive({
        src: "/animated_login_screen.riv", // Path to your Rive file
        stateMachines: "Login Machine", // Exact name of the state machine in your Rive file
        autoplay: true,
    })

    // Retrieve State Machine Inputs
    const isChecking = useStateMachineInput(rive, "Login Machine", "isChecking")
    const isHandsUp = useStateMachineInput(rive, "Login Machine", "isHandsUp")
    const trigSuccess = useStateMachineInput(
        rive,
        "Login Machine",
        "trigSuccess"
    )
    const trigFail = useStateMachineInput(rive, "Login Machine", "trigFail")
    const numLook = useStateMachineInput(rive, "Login Machine", "numLook")

    const handleTyping = (value) => {
        if (numLook) {
            // Adjust eye position based on the number of characters (up to a limit)
            numLook.value = Math.min(value.length, 100) // Limit to 10 for reasonable eye movement
        }
    }

    const signupFunction = async () => {
        const name = nameRef.current.value
        const username = usernameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value

        // Reset animation states
        if (isChecking) isChecking.value = false
        if (isHandsUp) isHandsUp.value = false

        // Simulate loading
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Mock success
        if (email && password && username && name) {
            if (trigSuccess) trigSuccess.fire()
            alert("Signup Successful!")
        } else {
            if (trigFail) trigFail.fire()
            alert("Signup Failed!")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Animation */}
            <div className="w-3/4">
                <RiveComponent className="h-80 w-full" />
            </div>

            {/* Form */}
            <div className=" w-3/4 bg-white p-8 shadow-lg rounded-lg -mt-16">
                <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        signupFunction()
                    }}
                    className="flex flex-col space-y-4"
                >
                    <input
                        type="text"
                        ref={nameRef}
                        placeholder="Name"
                        onFocus={() => isChecking && (isChecking.value = true)}
                        onBlur={() => isChecking && (isChecking.value = false)}
                        onChange={(e) => handleTyping(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        ref={usernameRef}
                        onFocus={() => isChecking && (isChecking.value = true)}
                        onBlur={() => isChecking && (isChecking.value = false)}
                        onChange={(e) => handleTyping(e.target.value)}
                        placeholder="Username"
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="email"
                        ref={emailRef}
                        placeholder="Email"
                        onFocus={() => isChecking && (isChecking.value = true)}
                        onBlur={() => isChecking && (isChecking.value = false)}
                        onChange={(e) => handleTyping(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="relative">
                        <input
                            type={isObscureText ? "password" : "text"}
                            ref={passwordRef}
                            placeholder="Password"
                            onFocus={() =>
                                isHandsUp && (isHandsUp.value = true)
                            }
                            onBlur={() =>
                                isHandsUp && (isHandsUp.value = false)
                            }
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setIsObscureText(!isObscureText)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {isObscureText ? "Show" : "Hide"}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup
