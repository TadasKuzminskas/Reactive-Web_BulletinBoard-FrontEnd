import axios from "axios"

export const fetchRefreshToken = async (err) => {
    if(err.response.data.message.startsWith("JWT expired at")) {
        //window.location.href = '/login'
        try {

          const payloadToken = {
            jwt : localStorage.getItem("token"),
            refresh : localStorage.getItem("refreshToken")
          }

            const refreshTokenResponse = await axios.post("http://localhost:9090/v1/refreshToken", payloadToken)
            console.log("response: ", refreshTokenResponse.data)
            localStorage.setItem("token", refreshTokenResponse.data.jwt)
            window.location.href = '/'
        } catch (err) {
          console.log(err.response.data)
        }
      }
}