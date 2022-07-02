import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { DesktopView } from "@components/DesktopView";
import { Window } from "@components/Window";

const Home: NextPage = () => {
    return <Box
        w={"100vw"}
        h={"100vh"}
        overflow={"auto"}
        display={"flex"}
        alignContent={"center"}
        justifyContent={"center"}
    >
        <DesktopView>
            <Window title={""}
                    // iconURL={iconurl}
            />
            {/*<Window title={"amongus"}/>*/}
        </DesktopView>
    </Box>
}

export default Home
const iconurl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAABPlBMVEX+3inHEBJ6CDkcAAwTKDmVytxPfaH8/PwAAAgAAAsAKTt9CDrJEBATAAgQAAYaAAtxBzz/5SpXBSjODg51Bzr/6SsNAAttBzIGHTBNBSMLAAP03yqe1ukPIzNTg6jDEBR4Ii6+EBgAADsdNUhiBi3czSf/8S3u1imzqSE4BAylDg+1DxGEICuhDSowAxUAGzoAFzpbe4kAECaECTUAIDmLCjKnDSbs9PevDiK2Dx07AxpllLIlAhAtKDnJuSOelB5+eBlPUBMhFAs9OA9wbhgZDwxeWBSPihwvLg8YFwsrAwt7Cg5KBgyRCw5UBw1fCA1rCAsdEh2OHigkIQ0AAChYJTSLiDUADztNJTY7JzcuODYpTV84XWxASjcAABZhi5uZuMSzz9nM3+ZGbYmBtshoJDF3p8FVWTA1VXAtFiCg124yAAAHPElEQVRoge2Ze1vaSBSHSwSakIQ4zUUUIVJA8IK2Uih4AS0U26q92G23Vrddr+t+/y+wM2eSyQSSAHb/7M/n8SFQ3zmcObeZPnr0W7/1WyCE0PKyma1gZc3lZYT+L66JKp3u/sErkanX73ay5q8vYGar/R7mWao2w6Raovh6UP01PEKdAeHOBEjDCxxmH4xHqPpGDAS7Eq2u+UB29a2o+Vgakf8d8eAhxpvlAx6tWZIkvVtZWXmHX/B+st6Wp6abXdHy9k+SVo5W7ZhCFLNXj44lifHVhWnpqC96tknHJ7aOqa4URVdW30sWWzo7HXsgelZ/WNM9MFtAt49cvHUwjemoJ7muDkY7X+BIorsidienmwOXbe2u6sFkkL72jrpenNgx5r7omv0xzGrmnA2gW/sThjuqiq63I82m9CYEviZWJoNXHEeqxzHdk6IEfwdlFkyXDifyujlY0DT1E1btdH19fQm0ftps27oesIDS2AbTP08AR2b3j1ycKjWkvS+n9sgeKLW5BdjSzlirK183/4yHCi/wrTmEV1rGBjHd6o/ZUvPr5rNwtMM/a/l2WSkYT4jXtdeRcFT+Pg5N+Ut+4wUhPdYvqPziBc/I5XIZR/ilj/6Np+uyDH6JjJfKZsahZra2tnKp4vnFxXPQxcX5eTGe29rKeHQOXpfniV/UiAJj/kXtzvwoXvz8+/LqJdbVYgL/UCUSNz8v4hnmGQ/eEEpqdAlAhzRKMs8TVy8fM10mfFq8jlMHpVoKBxfGBGN2k7JvFh/zeumHJ26S90BPnTHTlZogL0SWRtQFw7fuLh/7NQRPJPPnOb/pSs2QtyMjHYHHcxeJIfbVMHwnmS8C/NY1XWkacikNFWA5JFSeUsOH4MNeSSTukslrMP1M8eCCUwHMwCEPVcErPxY9+Murq8vFETaB56lfCgrLf0Fwinq3Ws6i4TEMfd0Er2AaBV+OYl23JPM0Xto8fAaqtISnPrXXr/onGfOfFzQMsYLs5TY06WxpqunC24ZAc5R2LzJG9jucg8zvGQaPFPZKkkZjqsbgswINF25QEg86LHRMyM7cdaTRCRLmIfD54YlSFfuu7eYzCo9GL4LdLpy5pYDhpdFxleWUC9+JhO8keXiLgwtzFG5ZKhkpwUdqD/nckkzehTvGMRtvKIWzaLExnJZ06yimK/bqyTGMPWLZ3VAHnty5CcTfuFYTeNEf58RymY4AtkLmMEU/IXSxirhQzF3DH+/c3fjBdxw5yZLI5i13+sWa8x7QrQENGHQISXSf9wj5HVA+OSKa/nss/QG+7YPHdAzXXjnRWIbakhkljcrJIdaMKBxiUVpl8Peq53QEWRQvBhgabDjfiwgcJgBpzR3OlCPL6x5OPc8Vk+PweafRNf1uAbh4WhcMQ240bX0V+0VyIx19p805fj8GX3T6HNeiGTxdEkCGUVsjO7rvJmnnaXw8Ps966K3X5sByaBfpkiy4Ukm4uHDUfeoOLJlzzB9dIJ+8LrIxsuBNLsFwXIRZjpJZjk2JeAgqnt9f4xWwnN/X90VvNEqtc14JhMu7Gj5desOGOeAnLhi4cvEiUZy85IYuzimOz2mjG4LPcCcCNPjhm9pC5WfT2gJw9YkHJynrBjqxvKfOfMJ/Og4db/rH3Ah41YN/xs/av7d4Cg8np+KnQ8cLKFwhcG9MMi38rL7X9ebtHj1V+LHkbHHb1IfPYKQTBcBJseEGX5Mc4tQPOj7/6YXW6dKXsz12convffuy1GzrQUdp0v2D4dwMhgjc+giW4ZoMVQIHGlFMoTVjhByjQ1EIXD1g8CzAj0ZOVCFnRPZ5LRTODXgAl06iUaMiI3QYXGKWVx4Ir4fCufMAwMXTaeExOQLOUrQMPq9PCcdHxUA4tCYvRQGeLk0Lb00Bn21PR6fBIofAOz64OlebEg77GWb5MLw+9o7Fr1lgQT1XS+PgRmEa02l+BjSLIHh6TpjKLzTKBWEcvOLA5SngTiCOt5zCS/I08aLXHLgzWkTDyYY3Jt5SxTaEMLjmg2dd+ORbqjdC4TT9WRJBPdfm8ee1CU13snMSOHQibRt/btgTma7YgueFYDgrXNBDtQ3y+UReV9ww5ODeGxv+kmu+IfBdAjcmcIwS89jO/i3MeW/sAtw7jPbI6gvwzcbTlYI3FwbA4cDO3dihAbkOX6CfGY3I1qnozVmBh28Pw+Haq+fB+xa/KfVC+L253q4bQiQcqiQ/WhxKvrI52wjCY7Ldkn1mM3iawWk54IYi1IUsmvd8aTRaMTjhMOFxqdkQDGFYNDg4OE3Qqnd30YFA3+A3yjDqtWarXbDtQqHdqtXqhjFKDoJv+HPIqbk0Fn18Y5YqmEthu0Nw4nKN/1+YymsSPjNyKCJcMlwVpdkjbUwD7sYIQaBrD2ALMr2oYI/zI7e75kDl/8VUcNUHF2At3xWpE4tzEZBouPulaaVhZ38Kr4q+XZkWrs04D0/gmpF65T9nwRbtGiDHbQAAAABJRU5ErkJggg=='