import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function AvaluationPage () {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = (star: any) => {
    setRating(star);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Container */}
      <View className="flex-1 bg-white p-4 rounded-t-lg shadow-lg">
        {/* Capa com Foto */}
        <View className="relative mb-4">
          <Image
            source={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUQEhMVFhUQFRUQDxUYFRUVFhUVFRUWFxUVFRUYHSggGBolHRUVITEhJSkrLi4uGB8zODMsNygtLysBCgoKDg0OGBAQGy0lICUtLS0tLS0tLS0rLS0vLy0uMC0tKy0tLS0tLS0rLy0tLS0tLS0tKy0tLS0tLS0tLS0tLf/AABEIAKIBNwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EAEgQAAIBAgMEBwQFCgQEBwAAAAECAAMRBBIhBTFBUQYTImFxgZEyQqHRUpKxwfAUFVNicoKi0uHiI0NU8TNEwtMHJGNkg5Oy/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EACsRAAICAQIFAwQCAwAAAAAAAAABAhEDEiEEEzFBUQUiYXGBkfCxwSMyUv/aAAwDAQACEQMRAD8A1L1Ubch+q4+8yhisGx9kEfWkr4W36QeK0vuWQ1qbjdUb0T+WZFgfHbLq2vnH8RgCthmBOYj6rQ9ji/Fz6LM/iLi99fL5GQykD6lMX5+A+cv4Vwq+yx5dkfKD1r2Oi/bCgqnJ7I9f6yCy/snaAG+m+n6i/KafC7YW1jRfX/0x8pnNmYbNvX0P3TRYPZQFjp6L8paskLUto0sv/CP1D9wjG2nT+jbxVx90eNnG2g+z5Sli8G6j2W8QxH2RuxIsVNtBdwv4B5XrbdFrkN5AwHisNU1J6z67GOwdAaXLedzMXNl0iTEbYDHQVPQW+yQtin90VL+A+UO4XCLbj6SavlUaX9IU2BmlbEXuA3pCGAr1b9pbeQkOPxXcfx5wd1rncCO+8xdplI3mCxgXfDOF2op94zzPC06h94w5s+g1xdz9v3zaGRkuJvExwO4mXqTXEz2z6Xf8P6w5hRbjOiMrMpItRRCdmhByKdigBydiigAooooAKKKKMBRRSNmiboEjrGRu8azxhMylI1UThMYZ0mRsZi2apEqNaWEqyopjwZUZUTKNlwNFKuacmvMM+WZdSG3fY0hxOF7vgZnsDtdl3kfb98I/ngMNSIlJMHFgza1KwOnxmRx9MW4/GajatYN7349ZmscAOPxkyKSApQX0UnyMuJU3DK1yeRnOstuJ+HzktKtmcC27uHzkFGt2HuGjD1mywlIEC0yWybmwsPqzYYKmRY3GncZrEzZar7rW+MD4xW4AnzHyl7GYkjW4gDF7WZTv4xSY0hYjCs3Bvh/LIBRK+6fP+iySht/XUj0EvrtSmw9kHySZ0itwPUxTju9flBe0NrBfadxfQAXJPcBD+NqUyCchNgTYBLnuGu+eWbZx3W1GIUoBay/R0Ft3Hj4kyoxTe4NujR/l6Fij9YrqcrAsBqN/D8c5d/JbrnptmUb+DDxBmYxmMSviFqWIzqnWg2t1gWxt+rcD4zT9FMcOtAy9gnKbGxsB7QHHvA15XtaOeKNCjJ2NpM3P4wvgqh7/AFEqdIMIMPiHpqoK6OhA91xcDQcNR5SPB4q29D8ROT/VmvU3Oyqm7fNLhRMNs7E7tLes1Gz69xvnTjkZSQfWOlWm/fLCmdCZk0OiiijEKKKKACiiigAojGvKtQnnJlKilGyd2kD1JVqE8/tnVmLnZqoUSgxxMjBnWMgo4xkLNOu0rs0zkzSKLIaODyoHjw8FIbiWs85K/WTkeoWk85q9HlOqt6Sodhuu5j6TtPbVMDc0ZV2zRPFhKUjMH43DOh3/AAMEY0MePwlnH49GOhvBtZwToTLsmhtiJ2kXDXF/jI1Rif6n5Qrhtl5uP8cllBfZm1WWwIt5maCtthmplQ1ibaqxBtrftaEcN0zmC6OM/vD60fj6X5NSe+vVh6jHhcD+2Z5JtRpHf6dhjPOnLot39jmztt1a71GdnNKlVCYcAkElAyMzEauCX439kaSytLrK2c4mooAuaRsRyvYIG+Mg6F4HLToUzobK5N9zHtG/mTLm0ay1qrsoGUMqU9PdQkk/vMWPg1pzyytN0/g9zHwmOcVGUd61N+G+38/ZDqmz3e+WoAOFww+LAQZhcLiszB0dQvsuhSojHxDBreUJUb5HqqSFV2sD2hlC8L6gkgcZZpNUBCaAsCfaIJAtuJBtvgssu5hP0zFdr8fv9AJ8fUQlM/aX2tQQNAR3nf8AbM8dnJWqE9YVJN9BmAv7QsSNNSbelpL0nxNSticjk5KSqFW51zqrm/Pfbyk2HcAZRoNwE3hJ7Oxw4TBTi4dPruCcdgKlE5rErfs1ANL62BHutodDvtpcaz0HoBRp4mgHDZWotlqpa+u+410DD4qYJ2dU1yuodH7LKT7Q5b98KdFOjdXD18Q9O/5PUQLRYsLtfKcpUa3W7rew1Gk3u+p5PGcIsHuj0YWxeUuTmvuA0G4aDylPE1rbju5ASxi8Gy/7n5QJiqlQaW+P9JjKJwplyjtCqTZTNLsrEVDa7TE0sVVG4Q1s/alYcAZMdmD3PSMCSd5hRJjNl7cYkKQt7FvIEAn1YTTYXHX32nZCSMZRYQijVe87eamZ2KKcJgB2cJjc0r1qpicqGkPq1ZUq1pHWqGVwZhKRtFEt48GQgx4MgslDRO0YDOVDExojqNKzvH1WlR3mEmbRROHneslXrIusk6iqLXWRSp1kUNQUeWthv1m9P6SlWwveZY/Op+lfylavjif9prE5CpWw4GsolwNJZrVyb6SlxmorLWHYc4SwuKA4eY/3g2iPxpCGHoab/smcmUjRbN2mi2uzD1gvplVvSKX7WIqU6Hf2mGb1Ab1jMKpzrdhYHM3gup+AkG0sSr4jDLcZU6yvUPeqhV+LTFy9y+N/wez6bjvFkfmo/l0/5NLSqZKbNxtlXxOnw1lMMFTQWJ0HnIvyvrVsh9g8Nb8ASPWcIJ38JyNn08IrewtSof4KDxJjqLdsP9HQeAk+BqpUQBWvbeNxHiI2oMu+2m7Uay67nJqttPruef7XrdZiariwuwFrDgqi2o7pVq4mxAJG/ePvjsbQqis6hVALFi7DsBWN1/aNju7pNUwTlqbUiKoUh66gIVKLa+h3gnSw1OawnbCGyPMycVFScYptp9kT4fEngd+8aEHyOk2fR3bZ6pkc+yQy9oBiGsG3791/P1zp2Wj1MtIhRlbIbWGYMSEcXuhy2Gove0rqWpPlcZWXeD+LEd8nVTOpQjmhpyKr3p9Tc1do3fIrMxJAQAasWtlHIHUbzprc6Tu1Nm1aYBfML2sdG335eBgDZW3kVlFQa0znVgLkHTstzXTx1bncaDaW22r1c61kFNVKrQC6N2gS7VG1v2RbQC3jpvGUXHd7ng8TwGbHN6I3HygK6tfff92SUEbn8IRqYrTMcwAvcZDcW0NwL7ue7yipY1CAwI1AIO64PdM2mcRXwVOoa+e9hTUKp55gxb45fqzWYLGuNCR6H5TNYLG6ZiR2zn8j7PouUeUu/nIfSEeqgo2uDxx5wkuKHGYDC7Xt74k+I28eE1jmoh47NwcanONbHJzE88fbbH/eLC7VJbh6xPOCxHowqg7pWqmBsHtIW3j1l0Y1TxHrL1qQtNHa5kCmcrVgYwGQy0Tgx4MhDRwaIZMDGVDOBox3kspEFa/KUahPKXneQl5hJG0WUy851stG3KRNTWZ6S9RD1sUTUBziipjtHmAwxG97+sbVAtwlRcQRvtIKuL52nSmzhO1EB4SL8nF/9pFVxPIxtHFd4mgWE6GHHP7JdVwth8oJXaFuXrJDtFSLWFybDUbzuEwcbY7LG1qwNJgLdogHw38PAQPScqfaPny5eEtYixBU2BGvtrcaeMH1Kqg2zAnvKgn4xctnrcFxmLHBKTp/vgvLiuevpLqbV0sSbd1hM5UxKjfceh++cXFg7m+0SXgfg9SPqeP/AKX5NIuLA1VnU87/ANZNU25ZLs5ewunefdB5zLnFGxN9wueMoHaZvfKDyLX08hHDhnIWb1XHDurC7ValVusqsWYbja4HcF4DU7hDOwq4Jam2oqU2TQntEWcKDwJKAee6ZUbWY6FKZHerH/qk4xY0IYDduDDhfjrpu9e4npeGRww4/Cu56ridovhsPaqgcCnSOFrA3WoosAGJ1U5Sb2IFi2h3nN43bKYhW6xDm0NNhbQksX7Q3A3Gmo03SHA9K6T0hh8Tdhe4dQQ49o/S1Pa5c9Dug7DPnIGVXJ0FrG/kdZDxyB+o44O1G78P+htINeyENvsL208DpxltdoNSIWoMp3jUfZe3CanZfRbrBlqimgOpXe+nNRb0vLeO6BCoBohVQQFPYFz7wy3IO/jbU3F7WawvuYv1Vp+1ADA7bWqSlUBqKBTVVc9ibhaedlOhzMnGxIA7oRHSIrU6lqKjCGnaqFAuUuNVyn2gdRbW8q4vYnUMvWUVRAyLUZAp7N9MxXfoCQG4r3QJR2gqIydaOy1Q3YhiuosAUuAt+/mPC1B9Djz8TzZa2gns6ur00DMy9WqoMyZHt2iDUC6WCgdvda2ukJHCqN7EW0OpmW2Ji6TV3SupDb6b72p3Zi2VdAR2gO8AEHhNht7HUStLLWoK6jq6hvYMqqMhy2LBgLA6brcoTgcyZCKS8G+Jjrjn9sgoKbK2dGVwWRlIIYBipI/eVh5SV08JgyyRTylzCUX7pTw+h4Q3gm8I1Gwst4Sk0K0lIkOHaT5pso0Q2SAx4MhzToeMCwGjwZWDxweIZYDSN3jM8q169pMioklR5XLyliMfbhKY2sOInO2bJBg1I01IMG00PGPGMU8RJsqi6akUp9eOcUAPMq9Qfq+sF4s+HrJquHI4j4ShiL851RicLIareErPUnK9QyqzzZITJnxZGl5Nh8QSeY4i14Jd9d8t4Sm5OgPda8bgiU2nsF8bi1QJnHWI17q62ZNdAj793h4x1LZtGsL4esUO8o5vpyDb1Hk0H4tatglVSFbUA7yRyse+FG2PUGHVEoBKgfM7MouVync9yRvGluG8Sl7Vuy8ktcrqvoVMXsRkBY+yLm5BKWA/SU76/t5YPoUrgOMygkhSd3he1iYc2VtGph+xVFuRvC6DD1e2UF20LKSt/wBsDR/3gY78kUzLVXfq2S4OYWHAwPTcg8iLj7jvm32j0d0zUWzccpsD8r+Fu5ZlMZQ1KspVl3gggjxBjVdhblUNJA8hKETgMoLLQaT0cUy7jKAePDxDs0+B6RsBlYm3Ai1x3i4I9QRNAnS/E0AKtOp1lM2Dg6FDuvk3WPgQDyFhPOleanofhg9QM2oU3I4WtrfmJL2Vlr3bHouyOl9HFU3p1aYYOuR7G1QKbaqSCNCAdALEAzFdIuilZQ1XDp11IEliq5qtje5qU7m9uYB3ndKeNwRoN11DRQbkD3PAcV7uHhu02xOkh0YGx424f075F9xIxps1JMVSdnei/U4gsb3Vv+E/cCLpbmBDXRd8O9YPXoq6lgtdWLbj7ysDcW36cpstobLoYim+MVAHKlMcF0FWifaqEbusQ2fNvIUjXS2Ep1lo1HoVKWR0YozIt1bk2moVgQw36GJ7oZt+keG6nFNTB7ACmgNBkp27KADQKtiABwAkdGx4iCtu7XFeqr63WjSpt+0qdv8AiJlanie8icknTZojWYbDA8oVw+HAmOwmLb6Zh7B4s/SlxkgNJT0js8HUcR3yx1k2JLOeODyqKkcHgBa6y0ifHKN8q4mtYQHj8VM5OikHqm26Y33+EqVNqI24+pA++YTaGPN7SuuOM5JzydjRUbitdtzL5so++Vhs2od2Q/8AyJ85kvzieca21W5mc7eX4NFNI1x2VX4KD4Oh++MbZWI/RnyKn75kW2u/0j6xv58q8Hb1PzjXN+A5iNW2zsR+iqeQP3RTJnpFWH+Y/q3znZX+Xwg5iAjX5SBgx90wu3R/F/on+sn80jOwsYP8p/VfnO5JnGB6tLnpKdWiOc0B2Li+NF/gfvjDsrE/oX+qDLUmgMv1YvvPpL2FNvp+kNfm3Ej/ACX/APrP3CVMbhcQ56gU6lyM1QCm11S9r2tfUi3kY9TlsKqKmDY1H6w3yr7HM23fOEmq9xkOJz4dBnRkX2UBQre3AXGsBYzH1KmjNZfojd584tEsj+BXQXrYukNCV9d3pukdHHop/wAN1A4q17H5H8awNRwzv7CM1voqzfYI6rgqii7U3A5lGA9SJtHEo9GLUaWttaoELLl01uDw1vb4eshwO26VWopxi5qNMEhQCczWIUE3uBfXlcazOUC9wqXu5AyjXMb6DL72toU2nhUBakpzNRF6xFrFv8y1t6rYD1375ajXUV2MpYdapfI2TtN1atdhk3qM2/S9uMpYzDPTPbXwIN1PnO0aljbnu7iN2v3wpTxN9GHa/wD0JTdCKNMYbICz1M9tRlFr8gb7u+UncE9kEDhfWFKmDQnNa3cN3pKeMU5x3D5wTTA4mk0Gx8SaeGxLjfkCKe92Ck+QJPlM5eajYhAVKbC4b/FqAXB1OSnY8PfPpJn0LiM2Zj84yu1TNvtnAB8LLfyvLDVUFgEAtoLXB9b3lfpbSSnUQIgp6DNlU2sBrY2ux9nduNwJJs6lUyhjTdgwGW6Fha2/dY3338JnKVKxpb0GujvStsO4uMyk2I01HG99LePrL+K2X1yK2GSozUnqUGViWqZDUY0SSxvpcodd+UQBiaZdD1mltUTLd2K+1p7otmFz374YwNdmdadR0WniKYouV0qmqhu1QW1z5hnVtwzJppaTp1K3sOzo6JbQtcYWr/DfyGa5grFUKtJstanUptwDoyE+AYaz0PBbc6stRrh2yMwFYVMlSwPtG4swNr9rgd5gLH/+KdEM1G1TE0QbXdEZW59l2PeLjlpJeG+gajPUKvfCWGxJG5pBtXE4Wqor4YVEVjZ10amCeAJOdD+q178DpaCxiO8znaadFpmspbQqDcQZdo7YbjMUmPI4yxT2oeJiuSKs3VHaw4y9SxyniJ55+cb8ZIuPtuaNZZIKRvsVX0me2liIHXbTDiDOVNuA70Hwlcyw2BO08Qc0qCuYQxW0KTb6Y+EFYmuvui0VJibJjXjGxA75UNeNNeGgWotNWEiaqJXauvKN61TGoCsnLj8GKQ9cOBEUelhZ6QcRj/0aeq/9yMOI2h+iT1H/AHIQTZFTiVH76/OSDY7/AEl+svzm3L+WK2CGxOP/AEK/j9+NGMx4/wCXv4X/AJobGxX5j6w+ccNi1PwR85XL+WKwMu0caN+EY+TfIyvgMTiaAd2wzlqjGrXqFXF7DT3TlRV0AvoB4zSrsWr3+sCdN8NVoYOoxvZ8tLfwdgCPq5ocv5DUea9I9tPiqxqudB2aS8FTu7zvJjNn4dR2nAzbwGFwB3qdD5yHZ2E66vTpAXzuAR3bz8AZpdt9C8UrmpRVnDHME1zgngL6MPjN1SM+u4d6N7c64mgzUqVRbdShXLTqDW4Rhcow00s1+FtZNtna1XD266gVXg186sO5lUgzzQV9crggqeNwQR8QZt+jvTVqY6nEnrKRFs5GcgcBUTXOO8a+O+TKCKUgJWYKKm0VWwZ3p4ZgFpjORq3VjUEBj2rnXkdQO2Ds+pUD4ig46zDdsoR7QPDkwIzgqd4FuM9G2n0XwuMRXouFChuqXM74cZzmJUKwZLnXQnwgRejxwa9YaVRWAKmqharQ1vZmt7K7rhiOOsaafQmmYzbyIKpamuQPq1IntUm0zJu9kG9jytyua9Gvpv1XUd44/Cbr83Uq2HBqKmJqpck0XC1shubU1HtheCkbjYWtaD8N0MpVQKq1aqUibN1lPIy7uYCnyMFVA0ZR67E7zE9yATc8uO4215bzNntnoHkXrMNVDrp2XIVrncA+4nuIEy20MD1KAPfrGIOXTsqB2r68WIA/ZaNCIMFhzUdaY3swHrNnRRkYgIAbhUOt2yCw9By4numP2OL1UGbKCyqzclJAJ8NZ6P0o2ViKFBxhWDUKl3fJUU51ygVCxYKRl0Fhra2+5kTTZcWYirjXxTgVA1YUrkhb3FPOOyDb2eXEXm+bpjeiWp08oy2pm4sDawAAHD7oL6D7IZaX5W5YAnrKZJIAVNesJPeL35KDBlKmatMqL9VVxL1EGoFi6rcDuV7eR5SZK/sNOibFYvqKYquSalXtEHeQfYQd1rEjwHuiDcFiiwGclNUOGyWJ6xQFUWtdlZcqkjiE4SVaRx2Oye5TJA8Bq58yLekPdL6rIKQbRqd6lEaAgoVFk8mJ0+iJTEvIY2lQo4zCLXfPuWlXCMBzykm2tiCngEmJ2j0ZCDNQYsBqVbKH8iNG9BNJ0R2+a9WpRrgL+UoS7ANbMx1e1haxCtlH6MyDrnp1Go1lyshIce0DlNmyk66Hh9vDP3RZWzMtsbaJoPewZG7NamdzrxBHP7DN0NkYUqtSmHZKih0NwdDwOm8G4mY6YbLFPLXXdUOV9Ldq11I8QDfwHOF+geJNSjUoGoydSwqoV+i/ZYb+YU+cMkbVoIutiy+yk92kfO0q1ti1T7NH4rNN+Rj/AFFb8fvRjbOH+prfj96ZU/BZlB0fxP0AP3pMnRvFfRX600n5t/8AdVvT+6OGzR/qq3p/dJafgDL1ejmKHuA+DCUK+xsQN9I+oP3zbnZY4Yqv6f3RrbPbhi6nml/+qFPwM89q4GoN6MJTrUCOc9HqbNqH/mgfGkJQxGwqrf51I+KgfdGm/Ajz10Mj/G+bLE9Fax40j4MB90GYjorX+iD4MDNFIhoAMo5xnV94hGtsDEr/AJbeWv2GUqmz64306n1Glr6iI8h5j0ijGoVRvVx+60UqhHq7UU5fZIzQXlH3/Gs5f8ayDQZ+TrynRhxyEdmnRUiAS4fu+JgrpbRIwzHWyshOpO9rc++GVqyPaCddSekd1RSt9NCdx8jY+Ua6iZ5vsJgMTTJNu0By9oFR8WE9Dcsozs7i2o7TfOeXVgyOQbhkJVhxBB1t9xm62ftj8oS5IzqO2Nw/aA5H+k0mu5EWZetRDir2bmkQym1y1MZtL79LL5+MGhwWAp3sbWDFSb/tCw89JtsDgQrMw3MMpG8WO+Jtiqjk08q34hVB8AQOz5Q1IWlma2RtythXvTJX6aH2W8Ru856Ds/polemyqzUqjZQ+VypFmDBhqCQCBpfUXGl5ndodXRp3rqrj3FIBLH9Xl4zDlze4FteyBfS/AHf3Q0qW4707HsPSHo1h6+TGUD1eIZc7olXs1TxZXIJLA8NTqL2OkzG2cVSbq0xbh2F8lWm96tEqR7Z0V9/vAHQyjhUx+H7Jps6NYsoIbW3Iahhe17eolPaQxFVmf8kcFwA16TOTlvY3todbd+l72EUbsbqjZYs0sTRyhg9rXKHKX0IswtcXDEHS44cICL7OqD/zfWpWcFjUQsbBiWy5NbAX5G/OZ1MPXTtilVTLvIpuoOu42Go7pawuy6zszfkpN76NmpBSbXYZmBJ05mVVdyeoRrdD2I67A1UxKKdVFlqLuNiNx38bHuhahtPPRXC1CaRZSjo6shAawdVDAXJVVHIAwfsrZWNoa0hRptYjOXZnF99vaUbhuXhNZsbHY2kQatemxGulMXvwuwyg/VkykUkBcfjcRiycIo6nDUCKbgKUvktlSx4WtZd24m+gkfSvEvSoUzTVVWj/AISKL2UNezanU357ybzSVq5ZmdtS5LMebMbk7uZMobbwfX4epSHtMt0/aU5l+IA85GrcqtjGdDMSaNUsN5Qga24jjDHSNKuKZXtfqg4ILX9qxBAOh3cxMxsjEZHV7aodR3biJ6ZRdXpgodGF7j8b5cnTsmKtHn+AxNfDtkAVRmR6gNtQu4Bhfx0+83P7d2gteotdCdECseZVGpqRoN4KDX6PGXl2S5JsRY6cj4bjJcNsAL2nPs6qACRfmSd8lyHpBnSfaQbBLRNMBlNMZ76koNTa3HX1kH/hziBTqVnK5wKIBW9rk1UtrY98GdKMeKtTIhuiaA8CeJHdpby75qegWAyUGqtoa7ALp7iX182J+rKe0RLdmh/P9P8A038f9k7+f6f+m/j/ALJJ1Y/AnMq8/hM9RY0bepf6b+P+yO/P1L/Tfxj+SOCL+BO9Wv4EVjGfn6l/pv4/7I1tt0T/AMufJx/JJCq8/hFlXuhYUVKu0KR3Uqo8GX+SU6rK25aw/ep/9uFig5D4ThQcorABNSbgK3maf8kjfDVD+k9U+Qh8oJGyd8QAZKVUfS88vzk6Vqg4X87S+VP4/wB5GfxpDcZCce/0F+t/SKSFR+LxQApgzuaCjtQc5z85DmPWaURYVNSNNQd0EttQDl6yGptoDl6woLDfXDu+E6Kw5j1EzFXb3K0qvttjHpYtSCHSjY4q/wCNSt1gFnX6YG636w+Mx1KsyHQkFTu1BB4+EMVdp1DuMG4wNUN21PPj6zSO2zIfwFMJ0odRZgreN1PqND6CS1+lzkWVEB53ZvhpM4cMe+PTBt3x6YiuQ7FYl6jZqjFju1+wAaAdwmo6LbAysMRWFiutJDvB4Mw4HkIH2f8A4ZzBAWHvHU+XLyhVdpVTwHpE76IaXk2Jrd4+EaawmUGOqcxHptB+JEz0s01I0rkMLEXB8ed5MtSZuntUjfLC7ZHL4GTpY7RoVeOmeG3ByPpHLt79Q/CGlhaD+SSpTHOZ9dun9GfURw22/Cl8f6Q0sLQN6W9HWVzisOMwbWugGoPF1HEHiPPnYXsfbbU/YOh3rw/H4vNKdq1z7NIfH5QFtPZNauxfqFVjvZLqT4jcfG15afZkP4ClPpTYapr+8PgAftgza/SKrVUpeynQgDKCO83uw7tJSp9FMWeYhrZXRFlIaqvWHkTZfMA6+cr2oPcwb0d2E+JbMbikD235291e/wCyek0qQUBV0CgKoG4AbhK+HVgAMoAGgA0AHIAbpYEzlKykqH5TziN4wxXklDwDHZTGCKIBxvGFjynC8XWd8AGkn6IjS/NPiZL1nhOFx3QAgNYcvtjTUHC8lZxyEiZxygA1ie+RsTyMeagjS8AIye5vQTkkLGKAjzJzGljFFOoxGkxpiigA5RJLRRRDHKJJbSKKIZwidvOxQAlpywoiijESACdInIoAK0eqiKKIZboIOQ9IWwtFfoj0E5FIZSCtCiv0R6CXKdMch6CKKZsokCiK0UUQzhE5aKKADhHrFFGA6KKKIBwE4Z2KAELyFoooAcWPtFFABrSBjOxQENvGPFFACu8UUUYH/9k=' }} // URL da imagem do entregador
            className="w-full h-56 rounded-lg"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 bg-[#ff0000] bg-opacity-40 p-2 px-4 rounded-b-lg">
            <Text className="text-white text-xl font-semibold">Nome do Entregador</Text>
            <Text className="text-white text-base">Entrega #12345</Text>
          </View>
        </View>
        {/* Avaliação */}
        <Text className="text-2xl font-semibold text-center text-gray-800 mb-4">Avalie o Entregador</Text>
        <View className="flex-row justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <FontAwesome
                name={star <= rating ? 'star' : 'star-o'}
                size={40}
                color={star <= rating ? '#FFD700' : '#C0C0C0'}
                className="mx-1"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Comentário */}
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-lg text-base mb-6 bg-gray-50"
          placeholder="Deixe seu comentário"
          value={comment}
          onChangeText={(text) => setComment(text)}
          multiline
          numberOfLines={4}
          textAlignVertical="top" // Alinha o texto ao topo da caixa
          style={{ maxHeight: 120 }} // Define uma altura máxima para a caixa
        />

        {/* Informações Adicionais */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-2">Informações Adicionais</Text>
          <Text className="text-base text-gray-600">Tempo estimado: 30-40 minutos</Text>
          <Text className="text-base text-gray-600">Data da entrega: 24/08/2024</Text>
        </View>

        {/* Botão de Enviar */}
        <TouchableOpacity
          className="bg-[#ff0000] gap-1 p-4 rounded-lg flex-row items-center justify-center shadow-md"
          onPress={() => console.log('Comentário enviado')}
        >
          <Text className="text-white text-lg font-semibold">Enviar Avaliação</Text>
          <MaterialIcons name="send" size={20} color="white" className="ml-2" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
