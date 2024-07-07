WITH voyage_data AS (
    SELECT 
        id,
        event,
        dateStamp,
        timeStamp,
        voyage_From,
        lat,
        lon,
        imo_num,
        voyage_Id,
        allocatedVoyageId,
        datetime((dateStamp - 25569) * 86400 + timeStamp * 86400, 'unixepoch') AS event_datetime
    FROM 
        voyages
    WHERE 
        imo_num = '9434761' 
        AND voyage_Id = '6' 
        AND allocatedVoyageId IS NULL
),
ordered_events AS (
    SELECT 
        *,
        LAG(event_datetime) OVER (ORDER BY event_datetime) AS prev_event_datetime,
        LAG(lat) OVER (ORDER BY event_datetime) AS prev_lat,
        LAG(lon) OVER (ORDER BY event_datetime) AS prev_lon,
        LAG(event) OVER (ORDER BY event_datetime) AS prev_event,
        LAG(voyage_From) OVER (ORDER BY event_datetime) AS prev_port
    FROM 
        voyage_data
),
segment_identification AS (
    SELECT 
        *,
        CASE 
            WHEN prev_event = 'SOSP' AND event = 'EOSP' AND prev_port = voyage_From THEN 'Port Stay'
            WHEN prev_event = 'EOSP' AND event = 'SOSP' AND prev_port != voyage_From THEN 'Sailing'
            ELSE 'Unknown'
        END AS segment_type,
        (JULIANDAY(event_datetime) - JULIANDAY(prev_event_datetime)) * 24 AS duration
    FROM 
        ordered_events
),
distance_calculation AS (
    SELECT 
        *,
        CASE 
            WHEN segment_type = 'Sailing' THEN
                2 * 3440.065 * ASIN(SQRT(
                    (SIN((lat * 0.0174533 - prev_lat * 0.0174533) / 2) * 
                     SIN((lat * 0.0174533 - prev_lat * 0.0174533) / 2)) +
                    COS(prev_lat * 0.0174533) * COS(lat * 0.0174533) *
                    (SIN((lon * 0.0174533 - prev_lon * 0.0174533) / 2) * 
                     SIN((lon * 0.0174533 - prev_lon * 0.0174533) / 2))
                ))
            ELSE 0
        END AS distance_travelled
    FROM 
        segment_identification
)
SELECT 
    id,
    event,
    event_datetime AS "event_datetime (UTC)",
    voyage_From,
    lat AS "latitude (degrees)",
    lon AS "longitude (degrees)",
    segment_type,
    duration AS "duration (hours)",
    distance_travelled AS "distance_travelled (nautical miles)",
    SUM(CASE WHEN segment_type = 'Sailing' THEN duration ELSE 0 END) 
        OVER (ORDER BY event_datetime) AS "cumulative_sailing_time (hours)",
    SUM(CASE WHEN segment_type = 'Port Stay' THEN duration ELSE 0 END) 
        OVER (ORDER BY event_datetime) AS "cumulative_port_time (hours)"
FROM 
    distance_calculation
ORDER BY 
    event_datetime;